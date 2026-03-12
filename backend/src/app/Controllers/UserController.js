import bcrypt from "bcrypt";
import User from "../Models/User.js";
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
    });
    req.login(newUser, (error) => {
      res
        .status(201)
        .json({ message: "Registration successfully!", user: newUser });
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        message: `${field} already used by other account , try another`,
      });
    }
    res
      .status(500)
      .json({ message: "Server internal error failed to register" });
  }
};
export const loginUser = async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if(!user){
          return res
            .status(400)
            .json({ message: "Email or your password is incorrect" });
    }
    if (user.googleId && !user.password) {
      res.status(400).json({
        message:
          "This email only can login via Google , if you want login use password update the password on the profile",
      });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      req.login(user, (error) => {
        if (error) {
          return res
            .status(400)
            .json({ message: "Email or your password is incorrect" });
        }
        res.status(201).json({ message: "Login successfully!", user });
      });
    } else {
      return res
        .status(400)
        .json({ message: "Email or your password is incorrect" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server internal error failed to register" });
  }
};
export const logoutUser = async (req, res) => {
  try {

    req.logout((error)=>{
        if(error){
           return  res.status(500).json({ message: "Server internal error failed to logout" });
        } 
        req.session.destroy((error)=>{
            if(error){
               return  res.status(500).json({ message: "Server internal error failed to logout" });
            } 
            res.clearCookie("connect.sid")
            res.status(200).json({message:"Logout Successfully"})
          })
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server internal error in logout" });

  }
};
