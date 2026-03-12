import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../Controllers/UserController.js";
import ProtectedRoutes from "../Middleware/ProtectedRoutes.js";
import { apiAuthorize } from "../Controllers/DefController.js";
export const userRouters = express.Router();
userRouters.post("/register", registerUser);
userRouters.post("/login", loginUser);
userRouters.use(ProtectedRoutes);
userRouters.post("/logout", logoutUser);

export const defRouters = express.Router()
defRouters.use(ProtectedRoutes)
defRouters.get("/me",apiAuthorize)