import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    slug: { type: String, unique: true, lowercase: true },
  },
  { timestamps: true },
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
