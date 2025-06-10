import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { redirect } from "react-router-dom";
dotenv.config({
  path: "./.env",
});
export function checkUserAuth(req, res, next) {
  const token = req.cookies.sessionid;
  if (!token) res.redirect("/user/register");
  else {
    try {
      const user = jwt.verify(token, process.env.SECRET_KEY);
      if (user) {
        req.user = user;
        next();
      }
    } catch (error) {
      console.log("eroor", error);
    }
  }
}

export function checkLogin(req, res, next) {
  const token = req.cookies.sessionid;
  if (!token) res.redirect("/user/register");
  else {
    try {
      const user = jwt.verify(token, process.env.SECRET_KEY);
      if (user) {
        res.redirect("/");
      }
    } catch (error) {
      console.log("eroor", error);
    }
  }
}
