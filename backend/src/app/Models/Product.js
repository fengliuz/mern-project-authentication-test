import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    sku: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    stock: { type: Number, default: 0 },
    minStock: { type: Number, default: 5 },
    unit: { type: String, default: "pcs" },
    image: { type: String },
    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);
productSchema.index({ sku: 1, warehouseId: 1 }, { unique: true });
const Product = mongoose.model("Product", productSchema);
export default Product;
