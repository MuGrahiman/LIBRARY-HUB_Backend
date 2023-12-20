import { v2 as Cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

Cloudinary.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.API_Key,
  api_secret: process.env.API_Secret,
  timeout: 60000 // Set the timeout value in milliseconds (60 seconds in this example)
});

// console.log(process.env)
// console.log(Cloudinary.config)
export default Cloudinary; 
 