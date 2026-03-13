import mongoose, { mongo } from "mongoose"
const categorySchema = new mongoose.Schema({
    name:{type:String,unique:true,required:true},
    description:{type:String},
    slug:{type:String,lowercase:true},

},{timestamps:true})
const Category = mongoose.model("Category",categorySchema)
export default Category