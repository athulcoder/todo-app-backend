import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constants.js";

dotenv.config({
  path: "./.env",
});
const connectDB = async () => {
  try {
    let con = await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`);
    console.log(`MONGO DB connection DONE !! ${con.connection.host}`);
  } catch (error) {
    console.log("MONGO DB CONNECTION ERROR : ", error);
  }
};

export default connectDB;
