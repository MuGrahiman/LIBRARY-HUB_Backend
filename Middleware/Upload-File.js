import expressAsyncHandler from "express-async-handler";
import ErrorResponse from "../utils/Error-Utils";
import { uploader } from "../utils/multer-utils";

const uploadFile = expressAsyncHandler((req, res, next) => {
  console.log("Request Body:", req.body);
  try {
  uploader.single("CoverBook")(req, res, (err) => {
    if (err) {
      // Handle multer or cloudinary upload errors here
      console.log("File upload failed:", err);
      next(ErrorResponse.internalError( `${err.message}`));
    }

    console.log("File uploaded successfully:", req.file);
    next();
  });
  } catch (error) {
    next(error)
  }
});

export default uploadFile;

// module.exports = {uploader,logMiddleware};
