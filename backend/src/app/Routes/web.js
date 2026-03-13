import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../Controllers/UserController.js";
import ProtectedRoutes from "../Middleware/ProtectedRoutes.js";
import { apiAuthorize } from "../Controllers/DefController.js";
import { createProduct, getAllProducts } from "../Controllers/ProductController.js";
import { createCategory, getAllCategories } from "../Controllers/CategoryController.js";
import { createTransaction, getTransactionHistory } from "../Controllers/TransactionController.js";
export const userRouters = express.Router();
userRouters.post("/register", registerUser);
userRouters.post("/login", loginUser);
userRouters.use(ProtectedRoutes);
userRouters.post("/logout", logoutUser);

export const defRouters = express.Router()
defRouters.get("/me",apiAuthorize)

export const productRoutes = express.Router()
export const categoryRoutes = express.Router()
export const transactionRoutes = express.Router()
productRoutes.use(ProtectedRoutes)
productRoutes.post("/store",createProduct)
productRoutes.get("/index",getAllProducts)

categoryRoutes.use(ProtectedRoutes)
categoryRoutes.post("/store",createCategory)
categoryRoutes.get("/index",getAllCategories)

transactionRoutes.use(ProtectedRoutes)
transactionRoutes.post("/store",createTransaction)
transactionRoutes.get("/index",getTransactionHistory)
