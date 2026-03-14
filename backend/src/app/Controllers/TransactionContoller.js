import Category from "../Models/Category";
import Product from "../Models/Product";
import Transaction from "../Models/Transaction";

export const createTransaction = async (req, res) => {
  try {
    const { type, note, productId, quantity } = req.body;
    const product = await Product.findById(productId);
    const previousStock = product.stock;
    let currentStock = previousStock;
    if (type === "IN") {
      currentStock += Number(quantity);
    } else if (type === "OUT") {
      if (quantity < 0) {
        return res.status(400).json({ message: "Quantity number invalid" });
      }
      if (previousStock < quantity) {
        return res.status(400).json({ message: "Stock doesnt enough" });
      }
      currentStock -= Number(quantity);
    } else if (type === "ADJUSTMENT") {
      if (req.user.username !== "admin") {
        return res
          .status(403)
          .json({
            message: "Warning forbidden access of type adjustment product",
          });
      }
      currentStock += quantity;
    }
    product.stock = currentStock;
    await product.save();
    const newTransaction = await Transaction.create({
      type,
      note,
      operator: req.user._id,
      product: productId,
      quantity,
      previousStock,
      currentStock,
    });
    res
      .status(201)
      .json({
        message: "New Transaction is created successfully",
        data: newTransaction,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed create new Transaction ${error.message}` });
  }
};
export const getAllTransactionsHistory = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res
      .status(200)
      .json({ message: "Success to retrieving Products data", data: products });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed retrieve Products Data ${error.message}` });
  }
};
