import Warehouse from "../Models/Warehouse.js";

// 1. Membuat Gudang Baru
export const createWarehouse = async (req, res) => {
  try {
    const { name, description,location } = req.body;

    // Cek apakah user sudah punya gudang dengan nama yang sama
    const existingWarehouse = await Warehouse.findOne({ 
      name, 
      owner: req.user._id 
    });

    if (existingWarehouse) {
      return res.status(400).json({ 
        message: "You already have a warehouse with this name!" 
      });
    }

    const newWarehouse = await Warehouse.create({
      name,
      description,location,
      owner: req.user._id, // User yang login otomatis jadi pemilik
    });

    return res.status(201).json({
      message: "Warehouse created successfully!",
      data: newWarehouse,
    });
  } catch (error) {
    return res.status(500).json({ 
      message: `Failed to create warehouse: ${error.message}` 
    });
  }
};

// 2. Mengambil Semua Gudang Milik User (Untuk Selector di Frontend)
export const getAllMyWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.find({ owner: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Success retrieved your warehouses",
      data: warehouses,
    });
  } catch (error) {
    return res.status(500).json({ 
      message: `Failed to fetch warehouses: ${error.message}` 
    });
  }
};

// 3. (Opsional) Detail Gudang Tertentu
export const getWarehouseById = async (req, res) => {
  try {
    const warehouse = await Warehouse.findOne({ 
      _id: req.params.id, 
      owner: req.user._id 
    });

    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found or access denied" });
    }

    return res.status(200).json({ data: warehouse });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};