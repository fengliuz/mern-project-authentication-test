import Product from "../Models/Product.js";
import dotenv from "dotenv";
import Transaction from "../Models/Transaction.js";
dotenv.config();
export const createTransaction = async (req, res) => {
  try {
    const { quantity, type, productId, note } = req.body;
    const warehouseId = req.headers["x-warehouse-id"];
    if (!warehouseId) {
      return res
        .status(400)
        .json({ message: "Please select a warehouse first!" });
    }
    const product = await Product.findOne({ _id: productId, warehouseId });
    if (!product) {
      return res.status(404).json({
        message: "Invalid Product Id in this warehouse!",
      });
    }
    const previousStock = product.stock;
    let currentStock = previousStock;
    if (type === "IN") {
      currentStock += Number(quantity);
    } else if (type === "OUT") {
      if (quantity < 0) {
        return res
          .status(400)
          .json({ message: "Input above 0 number quantity!" });
      }
      if (quantity > currentStock) {
        return res
          .status(400)
          .json({ message: "Stock too less, input lower quantity!" });
      }
      currentStock -= Number(quantity);
    } else if (type === "ADJUSTMENT") {
      if (req.user.username !== process.env.ADMIN) {
        return res.status(403).json({ message: `Forbidden access` });
      }
      currentStock += Number(quantity);
    }
    product.stock = currentStock;
    await product.save();
    const newTransaction = await Transaction.create({
      note,
      type,
      currentStock,
      previousStock,
      quantity,
      warehouseId,
      product: productId,
      operator: req.user._id,
    });
    return res.status(201).json({
      message: "Successfully to create a new Transaction",
      data: newTransaction,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Failed to create a new Transaction ${error.message}`,
    });
  }
};
export const getAllHistoriesOfTransactions = async (req, res) => {
  try {
    const warehouseId = req.headers["x-warehouse-id"];
    const transactions = await Transaction.find({warehouseId})
      .populate("operator", "username")
      .populate("product", "name sku");
    return res.status(200).json({
      message: `Successfully retrieved all transactions data`,
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Failed to retrieve transactions data ${error.message}`,
    });
  }
};
