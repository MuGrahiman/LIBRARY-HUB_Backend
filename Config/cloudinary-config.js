import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

import { v2 as Cloudinary } from "cloudinary";

// Cloudinary.config({
//   cloud_name: process.env.Cloud_Name,
//   api_key: process.env.API_Key,
//   api_secret: process.env.API_Secret,
// });
cloudinary.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.API_Key,
  api_secret: process.env.API_Secret,
});

module.exports = cloudinary;
 