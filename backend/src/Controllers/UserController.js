import bcrypt from "bcrypt"
import User from "../Models/User.js"
export const registerUser = async(req,res)=>{
    try {
        const {username,email,password} = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = await User.create({
            username,password:hashedPassword,email
        })
        req.login(newUser,(error)=>{
            res.status(201).json({message:"Registration successfully!",user:newUser})
        })
    } catch (error) {
        if(error.code === 11000){
            const field = Object.keys(error.keyValue)[0]
            return res.status(400).json({message:`${field} already used by other account , try another`})
        }
        res.status(500).json({message:"Server internal error failed to register"})
    }
}