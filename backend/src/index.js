import express from "express"
import dotenv from "dotenv"
import connectDb from "./lib/db.js"
import passport from "passport"
import session from "express-session"
import cors from "cors"
import "./lib/auth.js"
import userRouters from "./Routes/UserRoutes.js"
import InfoRoutes from "./Middleware/InfoRoutes.js"
dotenv.config()
const app = express()
connectDb()
// middleware Start
app.use(InfoRoutes)
app.use(session({   
    resave:false,saveUninitialized:false,secret:"123",cookie:{secure:false}
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors({
    origin:"http://localhost:5173/",
    credentials:true,
    methods:["POST","GET","DELETE","PUT"]
}))
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}))
app.get("/google/callback",passport.authenticate("google",{failureRedirect:"/",successRedirect:"/aa"}))
app.use(express.json())

// middleware routes
app.use("/api/auth",userRouters)
// middleware End

app.listen(process.env.PORT,(req,res)=>{
    console.log("APP RUNNING")
})