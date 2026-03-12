import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const connectDB = async()=>{

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo db connected successfully")
    } catch (error) {
        console.log("Mongo db failed to connect, "+ error)
    }
}
export default connectDB
