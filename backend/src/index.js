import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import InfoRoutes from "./app/Middleware/InfoRoutes.js";
import "./lib/auth.js";
import path from "path";
import {
  categoryRouters,
  defRouters,
  productRoutes,
  transactionRoutes,
  userRouters,
  warehouseRoutes,
} from "./app/Routes/web.js";
import { fileURLToPath } from "url";
dotenv.config();
// app initialization start
const app = express();
// middleware Start
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://windahouseware.vercel.app"
        : "http://localhost:5173",
    credentials: true,
    methods: ["POST", "GET", "DELETE", "PUT", "OPTIONS"],
  }),
);
app.use(express.json()); //for reqtrieve body request
app.use(InfoRoutes); //Info of the api's-hit
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    proxy: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "lax" : "none",
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

app.use(passport.initialize()); //initalizing passport
app.use(passport.session()); //session passport
//for the react / localhost:5173 can access the api
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }), //google provider
);
app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect:
      process.env.NODE_ENV === "production" ? "/" : "http://localhost:5173/",
  }),
);

app.use("/api/auth", userRouters);
app.use("/api", defRouters); //defRouting

app.use("/api/warehouse", warehouseRoutes); //warehouseRouting
app.use("/api/category", categoryRouters); //categoryRouting
app.use("/api/product", productRoutes); //productRouting
app.use("/api/transaction", transactionRoutes); //transactionRouting

// middleware End

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if (process.env.NODE_ENV === "production") {
  // Coba cari folder dist di root project (naik 2 tingkat dari backend/src)
  let frontendPath = path.resolve(__dirname, "../../frontend/dist");

  // Logika tambahan: Jika path pertama tidak ada, coba naik 1 tingkat (Vercel Flat Structure)
  if (!fs.existsSync(frontendPath)) {
    frontendPath = path.resolve(__dirname, "../frontend/dist");
  }

  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    const indexPath = path.join(frontendPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      // Jika masih tidak ketemu, beri pesan error yang jelas di browser
      res
        .status(404)
        .send(`Frontend build not found. Checked at: ${frontendPath}`);
    }
  });
}
if (process.env.NODE_ENV !== "production") {
  connectDB().then(() => {
    app.listen(process.env.PORT || 5001, () => {
      console.log("Server running on local");
    });
  });
} else {
  // Di production (Vercel), kita cukup pastikan DB terkoneksi
  connectDB();
}
export default app;
