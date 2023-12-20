import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const uri = process.env.URI;

const dbConnect = () =>
  new Promise((resolve, reject) => {
    mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 60000,
      })
      .then(() => {
        resolve("database connected successfully");
      })
      .catch((err) => {
        reject(err);
      });
  });
export default dbConnect;
  