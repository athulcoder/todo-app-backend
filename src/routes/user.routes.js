import express from "express";
import { registerUser } from "../controllers/user.controllers.js";
const router = express.Router();

router
  .get("/register", (req, res) => {
    res.send("regiser");
  })
  .post("/register", registerUser);

export const userRouter = router;
