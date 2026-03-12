import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import InfoRoutes from "./app/Middleware/InfoRoutes.js";
import "./lib/auth.js";
import {defRouters, userRouters} from "./app/Routes/web.js";
dotenv.config();
// app initialization start
const app = express();
// middleware Start
app.use(InfoRoutes); //Info of the api's-hit
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "123",
    cookie: { secure: false },
  }),
);
app.use(passport.initialize()); //initalizing passport
app.use(passport.session()); //session passport
//for the react / localhost:5173 can access the api
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["POST", "GET", "DELETE", "PUT"],
  }),
);
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }), //google provider
);
app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "http://localhost:5173/",
  }),
);
app.use(express.json()); //for reqtrieve body request

// middleware routes
app.use("/api/auth", userRouters); //userRouting
app.use("/api", defRouters); //defRouting

// middleware End
// Connecting database and listening app
connectDB().then(() => {
  app.listen(process.env.PORT, (req, res) => {
    console.log("res");
  });
});
