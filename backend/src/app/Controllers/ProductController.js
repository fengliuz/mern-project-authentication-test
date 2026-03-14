import Category from "../Models/Category.js";
import Product from "../Models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, sku, stock, categoryId, minStock, unit, description } =
      req.body;
    const categoryIsExist = await Category.findById(categoryId);
    if (!categoryIsExist) {
      return res.status(404).json({
        message: "Invalid Category Id !",
      });
    }
    const newProduct = await Product.create({
      name,
      description,
      sku,
      stock: Number(stock),
      minStock,
      unit,
      category:categoryId,
      createdBy:req.user._id
    });
    return res.status(201).json({
      message: "Successfully to create a new Product",
      data: newProduct,
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res
        .status(400)
        .json({
          message: `the ${field} is already created, try another ${field}`,
        });
    }
    return res.status(500).json({
      message: `Failed to create a new Product ${error.message}`,
    });
  }
};
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("createdBy","username").populate("category","name");
    return res
      .status(200)
      .json({
        message: `Successfully retrieved all products data`,
        data: products,
      });
  } catch (error) {
    return res.status(500).json({
      message: `Failed to retrieve products data ${error.message}`,
    });
  }
};
