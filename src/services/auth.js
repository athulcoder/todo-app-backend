import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config({
  path: "./.env",
});

export function generateSessionToken(user) {
  return jwt.sign(
    {
      _id: user._id,
    },
    process.env.SECRET_KEY
  );
}

export function checkAuth(token, req, res, next) {
  try {
    let user = jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    return null;
  }
}
