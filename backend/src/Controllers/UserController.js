import { User } from "../Models/User.js";
import bcrypt from "bcrypt";
export const registerManually = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      const salt = bcrypt.genSalt(10);
      const hashedPassword = bcrypt.hash(password, salt);
      user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
    }
    req.login(user,(error)=>{
        return res.status(201).json({
            message:"User registered successfully",
            data:user
        })
    })
  } catch (error) {
    if(error.name ==="ValidationError"){
        const messages = Object.values(error.errors).map((val)=>val.properties)
        return res.status(400).json({
            message:"Validation Error",
            errors:messages
        })
    }
    return res.status(500).json({message:"Server Internal Error"})
  }
};
