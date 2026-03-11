import express from "express"
import { registerUser } from "../Controllers/UserController.js"
const userRouters = express.Router()
userRouters.post("/register",registerUser)
// userRouters.post("/login")
// userRouters.post("/logout")

export default userRouters