import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import userRouter from "./Routes/UserRoutes.js";
import session from "express-session";
import passport from "passport";
import "./lib/auth.js"
import cors from "cors"
import InfoApi from "./Middleware/InfoApi.js";
dotenv.config();
const app = express();

connectDB();

// middleware start
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods:["POST","PUT","GET","DELETE"]
}))
app.use(
  session({
    resave: false,
    cookie: { secure: false },
    secret: "1123",
    saveUninitialized: false,
  }),
);
app.use(passport.initialize())
app.use(passport.session())

// custom
app.use(InfoApi)
// custom end
// middleware end
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login?failed=true" }),
);

app.use("/api", userRouter);
app.listen(process.env.PORT, (req, res) => {
  console.log("APP RUNNING");
});
