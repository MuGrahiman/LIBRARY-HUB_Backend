import {
  TokenExpiredError,
  JsonWebTokenError,
  NotBeforeError,
} from "jsonwebtoken";
import { MongooseError } from "mongoose";
import ErrorResponse from "../utils/Error-Utils";

export const errorHandler = (err, req, res, next) => {
  console.error(`in the error handler ${err}`);
  console.error(err);

  if (err instanceof ErrorResponse) {
    console.error("ErrorResponse in the error handler");
    return res.status(err.status).json({ message: err.message });
  }
  // JSON Web Token  Error Handler
  else if (err instanceof JsonWebTokenError) {
    console.error(`${err.name} JsonWebTokenError in the error handler`);
    return res.status(401).json({
      message: `Unauthorized access restricted.please login again`,
    });
  }
  // Custom Mongoose  error handler middleware
  else  if (err instanceof MongooseError) {
    console.error("ValidationError in the error handler");
    const errors = Object.values(err.errors).map((error) => error.message);
    console.log(errors)
    res.status(400).json({ success: false, errors });
  }
  // Custom Mongoose validation error handler middleware
  else if (err.name === "ValidationError") {
    console.error("ValidationError in the error handler");
    const mongoError = err;
    const validationError = Object.values(mongoError.errors);
    return res.status(403).json({
      message: validationError[0].message,
    });
  }

  // Unexpected error handler
  else {
    console.log("Unexpected Error In The Error Handler: ", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//   return res.status(500).json({
//     status: "error",
//     operational: false,
//     message: "Something went wrong!",
// });


