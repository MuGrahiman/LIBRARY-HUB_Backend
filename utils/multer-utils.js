  import Cloudinary from "../Config/cloudinary-config";
//   import dotenv from "dotenv";

// dotenv.config();

// import { v2 as Cloudinary } from "cloudinary";

// Cloudinary.config({  
//   cloud_name:'library-management',
//   api_key:253365443368232,
//   api_secret:'lFOxPvbwcpaYALdjVxd8G9TaCig',
// });

import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import path from "path";
console.log(process.env);
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

const uploadFile = (req, res, next) => {
  try {
    uploader.single('LLogo')(req, res, (err) => {
      if (err) {
        // Handle multer or cloudinary upload errors here
        console.log('File upload failed:', err);
        return res.status(500).json({ error: 'File upload failed' });
      }

      // File upload success
      console.log('File uploaded successfully:', req.file);
      // Continue with next middleware or send response
      next();
    });
  } catch (error) {
    // Handle any other errors during file upload
    console.log('Error during file upload:', error);
    return res.status(500).json({ error: 'Error during file upload' });
  }
};


// module.exports = {uploader}; 
