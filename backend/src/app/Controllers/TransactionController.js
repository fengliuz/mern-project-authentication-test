import Category from "../Models/Category.js";
import Product from "../Models/Product.js";
import Transaction from "../Models/Transaction.js";
import Warehouse from "../Models/Warehouse.js";
import mongoose from "mongoose";

export const createTransaction = async (req, res) => {
  // Gunakan session untuk memastikan atomicity (semua sukses atau semua batal)
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { quantity, type, productId, note, toWarehouseId } = req.body;
    const warehouseId = req.headers["x-warehouse-id"];

    if (!warehouseId) {
      return res.status(400).json({ message: "Please select a warehouse first!" });
    }

    // 1. Validasi Warehouse Asal
    const warehouse = await Warehouse.findById(warehouseId).populate("owner");
    if (!warehouse) {
      throw new Error("Invalid Warehouse Id!");
    }

    // 2. Validasi Produk di Gudang Asal
    const product = await Product.findOne({ _id: productId, warehouseId }).session(session).populate("category","name slug description");
    if (!product) {
      throw new Error("Product not found in this warehouse!");
    }
    const previousStock = product.stock;
    let currentStock = previousStock;

    if (type === "IN") {
      currentStock += Number(quantity);
    } 
    else if (type === "OUT") {
      if (quantity > previousStock) {
        throw new Error("Insufficient stock!");
      }
      currentStock -= Number(quantity);
    } 
    else if (type === "TRANSFER") {
      // Validasi Owner (Hanya owner gudang yang bisa transfer keluar)
      if (req.user.username !== warehouse.owner.username) {
        return res.status(403).json({ message: "Forbidden: Only warehouse owner can transfer items" });
      }

      if (!toWarehouseId) {
        throw new Error("Destination warehouse ID is required for transfer!");
      }

      // Kurangi stok di gudang asal
      if (quantity > previousStock) throw new Error("Insufficient stock for transfer!");
      currentStock -= Number(quantity);

      // --- LOGIC GUDANG TUJUAN ---
      // Cari apakah produk dengan SKU/Nama yang sama sudah ada di gudang tujuan
      let targetProduct = await Product.findOne({ 
        sku: product.sku, 
        warehouseId: toWarehouseId 
      }).session(session);
      let targetProductCategory = await Category.findOne({ 
        warehouseId: toWarehouseId,name:product.category.name
      }).session(session);

      if (targetProductCategory) {
        // jika ada yaudah
      } else {
        // Jika tidak ada, buat categori baru di gudang tujuan (copy data dari categori asal asal)
        await Category.create([{
          warehouseId:toWarehouseId,
          name:product.category.name,
          slug:product.category.slug,
          description:product.category.description,
        }], { session });
      }
      if (targetProduct) {
        // Jika ada, tambahkan stoknya
        targetProduct.stock += Number(quantity);
        await targetProduct.save({ session });
      } else {
        // Jika tidak ada, buat produk baru di gudang tujuan (copy data dari produk asal)
        await Product.create([{
          name: product.name,
          sku: product.sku,
          description: product.description,
          category: product.category._id,
          unit: product.unit,
          stock: Number(quantity),
          minStock: product.minStock,
          warehouseId: toWarehouseId,
          createdBy:req.user._id
        }], { session });
      }
    }

    // 3. Update stok produk asal
    product.stock = currentStock;
    await product.save({ session });
    const targetWarehouse = await Warehouse.findById(toWarehouseId)
    // 4. Catat Transaksi
    const newTransaction = await Transaction.create([{
      note: note || (type === "TRANSFER" ? `Transfer to ${targetWarehouse.name} from ${warehouse.name}` : ""),
      type,
      currentStock,
      previousStock,
      quantity,
      warehouseId,
      toWarehouseId: type === "TRANSFER" ? toWarehouseId : null,
      product: productId,
      operator: req.user._id,
    }], { session });

    // Commit semua perubahan
    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      message: "Transaction processed successfully",
      data: newTransaction[0],
    });

  } catch (error) {
    // Jika ada error, batalkan semua perubahan database yang sempat terjadi
    await session.abortTransaction();
    session.endSession();
    return res.status(error.message.includes("not found") ? 404 : 400).json({
      message: error.message,
    });
  }
};

export const getAllHistoriesOfTransactions = async (req, res) => {
  try {
    const warehouseId = req.headers["x-warehouse-id"];
    // Tampilkan transaksi di mana gudang ini adalah ASAL atau TUJUAN (untuk transfer)
    const transactions = await Transaction.find({
      $or: [{ warehouseId }, { toWarehouseId: warehouseId }]
    })
      .sort({ createdAt: -1 })
      .populate("operator", "username")
      .populate("product", "name sku")
      .populate("toWarehouseId", "name");

    return res.status(200).json({
      message: `Successfully retrieved all transactions`,
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error: ${error.message}`,
    });
  }
};

export const deleteTransaction = async(req,res)=>{
  try {
    const transactionId = req.params.id

    const transaction = await Transaction.findById(transactionId)
    if(!transaction){
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }
    transaction.deleteOne()
    await transaction.save()
    return res.status(200).json({message:"Transaction history deleted successfully"})
  } catch (error) {
    return res.status(500).json({message:"Failed to delete transaction server internal error"})
  }
}