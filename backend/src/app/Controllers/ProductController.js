import Category from "../Models/Category.js";
import Product from "../Models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, sku, stock, categoryId, minStock, unit, description } =
      req.body;
    const warehouseId = req.headers["x-warehouse-id"];

    if (!warehouseId) {
      return res
        .status(400)
        .json({ message: "Please select a warehouse first!" });
    }
    if (minStock < 0 || stock < 0) {
      return res
        .status(400)
        .json({ message: "Please input a valid stock number!" });
    }

    const categoryIsExist = await Category.findOne({
      _id: categoryId,
      warehouseId,
    });
    if (!categoryIsExist) {
      return res.status(404).json({
        message: "Invalid Category Id in this warehouse!",
      });
    }
    const newProduct = await Product.create({
      name,
      description,
      sku,
      stock: Number(stock),
      minStock,
      unit,
      warehouseId,
      category: categoryId,
      createdBy: req.user._id,
    });
    return res.status(201).json({
      message: "Successfully to create a new Product in this warehouse",
      data: newProduct,
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        message: `the ${field} is already created in this warehouse, try another ${field}`,
      });
    }
    return res.status(500).json({
      message: `Failed to create a new Product ${error.message}`,
    });
  }
};
export const editProduct = async (req, res) => {
  try {
    const { name, stock, categoryId, minStock, unit, description } = req.body;
    const warehouseId = req.headers["x-warehouse-id"];
    const productId = req.params.id;
    if (!warehouseId) {
      return res
        .status(400)
        .json({ message: "Please select a warehouse first!" });
    }
    if (minStock < 0 || stock < 0) {
      return res
        .status(400)
        .json({ message: "Please input a valid stock number!" });
    }

    const categoryIsExist = await Category.findOne({
      _id: categoryId,
      warehouseId,
    });
    if (!categoryIsExist) {
      return res.status(404).json({
        message: "Invalid Category Id in this warehouse!",
      });
    }
    const product = await Product.updateOne(
      { _id: productId, warehouseId },
      { name, stock, minStock, category: categoryId, unit, description },
    );
    return res.status(201).json({
      message: "Successfully to update a Product in this warehouse",
      data: product,
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        message: `the ${field} is already created in this warehouse, try another ${field}`,
      });
    }
    return res.status(500).json({
      message: `Failed to update a Product ${error.message}`,
    });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const warehouseId = req.headers["x-warehouse-id"];

    if (!warehouseId) {
      return res
        .status(400)
        .json({ message: "Please select a warehouse first!" });
    }
    const product = await Product.deleteOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not exists" });
    }
    return res.status(201).json({
      message: "Successfully to delete Product in this warehouse " + productId,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Failed to delete a new Product ${error.message}`,
    });
  }
};
export const getProduct = async (req, res) => {
  try {
    const warehouseId = req.headers["x-warehouse-id"];
    const productId = req.params.id
    const product = await Product.findOne({_id:productId,warehouseId})
      .populate("createdBy", "username")
      .populate("category", "name");
    return res.status(200).json({
      message: `Successfully retrieved product data`,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Failed to retrieve product data ${error.message}`,
    });
  }
};
export const getAllProducts = async (req, res) => {
  try {
    const warehouseId = req.headers["x-warehouse-id"];

    const products = await Product.find({ warehouseId })
      .populate("createdBy", "username")
      .populate("category", "name");
    return res.status(200).json({
      message: `Successfully retrieved all products data`,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Failed to retrieve products data ${error.message}`,
    });
  }
};
