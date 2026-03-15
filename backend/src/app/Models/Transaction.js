import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    type:{
        type:String,enum:["IN","OUT","ADJUSTMENT"],required:true
    },
    note:{type:String},
    previousStock:{type:Number},
    currentStock:{type:Number},
    quantity:{type:Number,required:true,min:1},
    product:{
        type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true
    },
    operator:{
            type:mongoose.Schema.Types.ObjectId,ref:"User",required:true
        },
    warehouseId:{
        type:mongoose.Schema.Types.ObjectId,ref:"Warehouse",required:true
    }
},{timestamps:true})

const Transaction = mongoose.model("Transaction",transactionSchema)
export default Transaction