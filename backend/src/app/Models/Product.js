import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    sku:{type:String,required:true,unique:true},
    name:{type:String,required:true,},
    description:{type:String},
    price:{type:Number,default:0},
    stock:{type:Number,default:0},
    minStock:{type:Number,default:5},
    unit:{type:String,default:"pcs"},
    image:{type:String},
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})
const Product = mongoose.model("Product",productSchema)
export default Product