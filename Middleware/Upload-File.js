import {uploader} from '../utils/multer-utils'

const uploadFile = (req, res, next) => {
  console.log("Request Body:", req.body);
  try {
      uploader.single('CoverBook')(req, res, (err) => {
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
  
  export default uploadFile;
  
  // module.exports = {uploader,logMiddleware}; 
  