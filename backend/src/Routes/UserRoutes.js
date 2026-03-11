import express from "express"
import { loginUser, logoutUser, registerUser } from "../Controllers/UserController.js"
import ProtectedRoutes from "../Middleware/ProtectedRoutes.js"
const userRouters = express.Router()
userRouters.post("/register",registerUser)
userRouters.post("/login",loginUser)
userRouters.use(ProtectedRoutes)
userRouters.post("/logout",logoutUser)

export default userRouters