import app from "./app.js";
import connectDB from "./db/db.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log("Server is listeing at port ", PORT);
    });
  })
  .catch((error) => {
    console.log("CONNECTION ERROR : ", error);
  });
