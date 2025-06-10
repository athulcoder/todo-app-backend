import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config({
  path: "./.env",
});

export function generateSessionToken(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_KEY
  );
}
