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
    req.login(user, (error) => {
      return res.status(201).json({
        message: "User registered successfully",
        data: user,
      });
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.properties);
      return res.status(400).json({
        message: "Validation Error",
        errors: messages,
      });
    }
    return res.status(500).json({ message: "Server Internal Error" });
  }
};
export const loginManually = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Email or password that you input is not exists" });
    }
    if (user.googleId && !user.password) {
      return res.status(400).json({
        message:
          "Email that you input only can login via Google because it didn't have local app password",
      });
    }
    const isExists = bcrypt.compare(password, user.password);
    if (isExists) {
      req.login(user, (error) => {
        return res.status(200).json({
          message: "User login successfully",
          data: user,
        });
      });
    } else {
      return res
        .status(404)
        .json({ message: "Email or password that you input is not exists" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Internal Error" });
  }
};

export const logout = async (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        return res.status(400).json({ message: "Logout failed" });
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(400).json({ message: "Logout failed" });
        }
      });
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logout successfull" });
    });
  } catch (error) {
        return res.status(500).json({ message: "SERVER ERROR ,Logout failed " + error });

  }
};
