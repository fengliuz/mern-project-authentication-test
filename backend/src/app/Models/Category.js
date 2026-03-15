import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String},
    warehouseId:{type:mongoose.Schema.Types.ObjectId,ref:"Warehouse",required:true},
    slug:{type:String}
},{timestamps:true})
categorySchema.index({name:1,warehouseId:1},{unique:true})
categorySchema.index({slug:1,warehouseId:1},{unique:true})
const Category = mongoose.model("Category",categorySchema)
export default Category