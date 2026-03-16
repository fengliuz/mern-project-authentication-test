import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    type:{
        type:String,enum:["IN","OUT","TRANSFER"],required:true
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
    },
    toWarehouseId:{
        type:mongoose.Schema.Types.ObjectId,ref:"Warehouse",
        validate:{
            validator:function(v){
                if(this.type === "TRANSFER"){
                    return v && v.toString() !== this.warehouseId.toString()
                }
                return true
            },
            message:"Warehouse purposing must be different with nowaday warehouse!"
        }
    },
    
},{timestamps:true})
transactionSchema.index({warehouseId:1})
transactionSchema.index({product:1})

const Transaction = mongoose.model("Transaction",transactionSchema)
export default Transaction