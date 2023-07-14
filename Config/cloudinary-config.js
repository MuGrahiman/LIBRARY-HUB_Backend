import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.API_Key,
  api_secret: process.env.API_Secret,
  timeout: 60000 // Set the timeout value in milliseconds (60 seconds in this example)
});

module.exports = cloudinary;
 