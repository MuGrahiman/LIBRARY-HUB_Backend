import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import Cloudinary from "../Config/cloudinary-config";
import dotenv from "dotenv";

dotenv.config();

// import { v2 as Cloudinary } from "cloudinary";

// Cloudinary.config({
//   cloud_name:'library-management',
//   api_key:'253365443368232',
//   api_secret:'lFOxPvbwcpaYALdjVxd8G9TaCig',
// });

// Cloudinary.config({
//   cloud_name: process.env.Cloud_Name,
//   api_key: process.env.API_Key,
//   api_secret: process.env.API_Secret,
// });
// export const uploader = multer({ dest: 'uploads/' })

const storage = new CloudinaryStorage({
  cloudinary: Cloudinary,
  folder: "lunarLibrary",
  // Adjust the limits option to increase timeout
  limits: {
    fieldSize: 10 * 1024 * 1024, // Adjust the fieldSize limit if needed
    fileSize: 10 * 1024 * 1024, // Adjust the fileSize limit if needed
  },
});

export const uploader = multer({
  storage: storage,
});
