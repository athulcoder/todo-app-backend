import express from "express";
import { registerUser, loginUser } from "../controllers/user.controllers.js";
const router = express.Router();

router
  .get("/register", (req, res) => {
    res.render("register");
  })
  .post("/register", registerUser);

router
  .get("/login", (req, res) => {
    res.render("login");
  })
  .post("/login", loginUser);
export const userRouter = router;
