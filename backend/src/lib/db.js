import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo DB connected successfully")
    } catch (error) {
        console.log("ERROR DB NOT CONNECTED",error)
    }
}
export default connectDB