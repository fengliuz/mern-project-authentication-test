import Transaction from "../Models/Transaction";
import Product from "../Models/Product";

export const createTransaction = async(req,res)=>{
    try {
        const {productId,type,quantity,note} = req.body

        const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 2. Simpan stok lama untuk audit log
    const previousStock = product.stock;
    let currentStock = previousStock;

    // 3. Hitung stok baru berdasarkan tipe transaksi
    if (type === "IN") {
      currentStock += Number(quantity);
    } else if (type === "OUT") {
      // Cek apakah stok cukup jika barang keluar
      if (previousStock < quantity) {
        return res.status(400).json({ message: "Stok tidak mencukupi!" });
      }
      currentStock -= Number(quantity);
    } else if (type === "ADJUSTMENT") {
      // Untuk adjustment, quantity bisa positif atau negatif
      currentStock += Number(quantity);
    }

    // 4. Update stok produk di database
    product.stock = currentStock;
    await product.save();

    // 5. Simpan history transaksi
    const newTransaction = await Transaction.create({
      type,
      product: productId,
      quantity,
      previousStock,
      currentStock,
      note,
      operator: req.user._id // User yang sedang login
    });

    res.status(201).json({
      message: `Transaksi ${type} berhasil`,
      transaction: newTransaction,
      updatedStock: currentStock
    });

  } catch (error) {
    res.status(500).json({ message: "Gagal transaksi", error: error.message });
  }
}

export const getTransactionHistory = async (req, res) => {
  try {
    const history = await Transaction.find()
      .populate("product", "name sku") // Ambil nama dan SKU produk
      .populate("operator", "username") // Ambil nama operator
      .sort({ createdAt: -1 }); // Urutkan dari yang terbaru

    res.status(200).json({ data: history });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};