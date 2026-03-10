import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import userRouter from "./Routes/UserRoutes.js";
import session from "express-session";
import passport from "passport";
import "./lib/auth.js"
dotenv.config();
const app = express();

connectDB();

// middleware start
app.use(express.json());
app.use(
  session({
    resave: false,
    cookie: { secure: false },
    secret: "1123",
    saveUninitialized: false,
  }),
);
// middleware end
app.get("/", (req, res) => {
  res.send("<a href='/auth/google'>Auth</a>");
});
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login?failed=true" }),
  (req, res) => {
    res.redirect("/dash");
  },
);
app.get("/dash", (req, res) => {
  res.send(`hai`);
});
app.use("/api", userRouter);
app.listen(process.env.PORT, (req, res) => {
  console.log("APP RUNNING");
});
