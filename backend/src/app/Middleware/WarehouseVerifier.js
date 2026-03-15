import Warehouse from "../Models/Warehouse.js";

export const WarehouseVerifier = async (req, res, next) => {
  try {
    const warehouseId = req.headers["x-warehouse-id"];
    const warehouse = await Warehouse.findById(warehouseId);
    if (warehouse.owner.equals(req.user._id)) {
      return next();
    } else {
      return res.status(403).json({ message: `Forbidden access to this warehouse` });
    }
  } catch (error) {
        return res.status(500).json({message:`Server Internal error`})
  }
};
