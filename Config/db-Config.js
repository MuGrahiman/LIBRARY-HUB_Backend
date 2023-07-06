import dotenv from "dotenv";
import mongoose from "mongoose";
import MongoDBStore from "connect-mongodb-session";
import session from "express-session";

dotenv.config();

const uri = process.env.URI;

const dbConnect = () =>
  new Promise((resolve, reject) => {
    mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        resolve("database connected successfully");
      })
      .catch((err) => {
        reject(err);
      });
  });
export default dbConnect;

const MongoDBStoreSession = MongoDBStore(session);
export const store = new MongoDBStoreSession({
  uri,
  databaseName: "Library_Management",
  collection: "sessions", // Collection name to store the sessions
});
