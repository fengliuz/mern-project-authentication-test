import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    type:{
        type:String,
        required:true,
        enum:["IN","OUT","ADJUSTMENT"]
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    quantity:{
        type:Number,required:true
    },
    previousStock:{type:Number},
    currentStock:{type:Number},
    note:{type:String},
    operator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})
const Transaction = mongoose.model("Transaction",transactionSchema)
export default Transaction