import Product from "../Models/Product";

export const createProduct = async (req, res) => {
  try {
    const { sku, name, description, price, stock, minStock, unit, categoryId } =
      req.body;
    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) {
      return res.status(400).json({ message: "SKU Already Exists" });
    }
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found!" });
    }
    const newProduct = await Product.create({
      sku,
      name,
      description,
      price,
      stock,
      minStock,
      unit,
      category: categoryId,
      createdBy: req.user._id,
    });
    res.status(201).json({
      message: "A new Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed create new Product", error: error.message });
  }
};
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .populate("createdBy", "username");
    res.status(200).json({
      message: "Success retrieved all data from products",
      data: { products },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retieved all data from products ",
      error: error.message,
    });
  }
};
s;
