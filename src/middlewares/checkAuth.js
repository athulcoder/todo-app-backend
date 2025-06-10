import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
export function checkUserAuth(req, res, next) {
  const token = req.cookies.sessionid;
  if (!token) res.redirect("/user/register");
  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    console.log(user);
    if (user) {
      next();
    }
  } catch (error) {
    console.log("eroor", error);
  }
}
