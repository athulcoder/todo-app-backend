import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { userRouter } from "./routes/user.routes.js";
import multer from "multer";

const app = express();
const update = multer();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", update.none(), userRouter);
app.get("/", (req, res) => {
  res.render("index");
});
export default app;
