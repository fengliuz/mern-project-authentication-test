import Category from "../Models/Category.js";

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const slug = name.toLowerCase().split(" ").join("-");

    const warehouseId = req.headers["x-warehouse-id"];
    if (!warehouseId) {
      return res
        .status(400)
        .json({ message: "Please select a warehouse first!" });
    }
    const newCategory = await Category.create({ name, description, slug ,warehouseId});
    return res.status(201).json({
      message: "Successfully to create a new Category",
      data: newCategory,
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
      message: `Failed to create a new category ${error.message}`,
    });
  }
};
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({warehouseId:req.headers["x-warehouse-id"]});
    return res
      .status(200)
      .json({
        message: `Successfully retrieved all categories data`,
        data: categories,
      });
  } catch (error) {
    return res.status(500).json({
      message: `Failed to retrieve categories data ${error.message}`,
    });
  }
};
