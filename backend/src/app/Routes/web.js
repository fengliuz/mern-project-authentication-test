import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../Controllers/UserController.js";
import ProtectedRoutes from "../Middleware/ProtectedRoutes.js";
import { createCategory, deleteCategory, editCategory, getAllCategories } from "../Controllers/CategoryController.js";
import { createProduct, deleteProduct, editProduct, getAllProducts, getProduct } from "../Controllers/ProductController.js";
import { createTransaction, getAllHistoriesOfTransactions } from "../Controllers/TransactionController.js";
import { WarehouseVerifier } from "../Middleware/WarehouseVerifier.js";
import { createWarehouse, getAllMyWarehouses, getWarehouseById } from "../Controllers/WarehouseController.js";
export const userRouters = express.Router();
userRouters.post("/register", registerUser);
userRouters.post("/login", loginUser);
userRouters.post("/logout",ProtectedRoutes, logoutUser,);
// =============================== Login Register Logout End ====================================

export const categoryRouters = express.Router()
categoryRouters.use(ProtectedRoutes,WarehouseVerifier)
categoryRouters.post("/",createCategory)
categoryRouters.get("/",getAllCategories)
categoryRouters.put("/:id",editCategory)
categoryRouters.delete("/:id",deleteCategory)

export const productRoutes = express.Router()
productRoutes.use(ProtectedRoutes,WarehouseVerifier)
productRoutes.post("/",createProduct)
productRoutes.get("/",getAllProducts)
productRoutes.delete("/:id",deleteProduct)
productRoutes.put("/:id",editProduct)
productRoutes.get("/:id",getProduct)

export const transactionRoutes = express.Router()
transactionRoutes.use(ProtectedRoutes,WarehouseVerifier)
transactionRoutes.post("/",createTransaction)
transactionRoutes.get("/",getAllHistoriesOfTransactions)

export const warehouseRoutes = express.Router()
warehouseRoutes.use(ProtectedRoutes)
warehouseRoutes.post("/",createWarehouse)
warehouseRoutes.get("/",getAllMyWarehouses)
warehouseRoutes.get("/:id",getWarehouseById)










// ========================================= MIDDLEWARE KHUSUS AUTENTIKASI =======================
export const defRouters = express.Router()
defRouters.use(ProtectedRoutes)
defRouters.get("/me",async(req,res)=>{
      res.status(200).json({message:"Authenticated",data:req.user})
})