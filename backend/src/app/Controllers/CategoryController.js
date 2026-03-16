import Category from "../Models/Category.js";
import Product from "../Models/Product.js";

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

export const editCategory  = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }

    category.name = name || category.name;
    category.description = description || category.description;
    
    if (name) {
      category.slug = category.name.toLowerCase().split(" ").join("-");
    }
    await category.save();

    res.status(200).json({
      message: "Kategori berhasil diperbarui",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- DELETE CATEGORY ---
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }

    // PILIHAN A: Menghapus produk yang terkait (Cascade Delete)
    // await Product.deleteMany({ category: id });

    // PILIHAN B: Set category produk menjadi null agar produk TIDAK hilang
    await Product.updateMany(
      { category: id }, 
      { $set: { category: null } } 
    );

    // Hapus kategorinya
    await category.deleteOne();

    res.status(200).json({
      message: "Kategori dihapus, produk terkait kini tidak berkategori",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};