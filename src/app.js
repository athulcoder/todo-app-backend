import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { userRouter } from "./routes/user.routes.js";
import multer from "multer";
import { checkLogin, checkUserAuth } from "./middlewares/checkAuth.js";
import cookieParser from "cookie-parser";

const app = express();
const update = multer();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

app.use("/user", userRouter);

app.get("/", checkUserAuth, (req, res) => {
  let user = req.user;
  res.render("index", { user });
});
export default app;
