import Warehouse from "../Models/Warehouse.js";

export const WarehouseVerifier = async (req, res, next) => {
    const warehouseId = req.headers["x-warehouse-id"] || req.query.warehouseId || req.body.warehouseId;
    const warehouse = await Warehouse.findById(warehouseId);
    if (warehouse?.owner?.equals(req.user._id)) {
      return next();
    } else {
      return res.status(403).json({ message: `Forbidden access to this warehouse` });
    }

};
