import express from "express"
import { registerManually } from "../Controllers/UserController.js"
const userRouter = express.Router()

userRouter.post("/register",registerManually)

export default userRouter