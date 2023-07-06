import {
  TokenExpiredError,
  JsonWebTokenError,
  NotBeforeError,
} from "jsonwebtoken";
import ErrorResponse from "../utils/Error-Utils";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof ErrorResponse) {
    console.error("ErrorResponse");
    return res.status(err.status).json({ message: err.message });
  }
  // JSON Web Token  Error Handler
  else if (err instanceof JsonWebTokenError) {
    console.error(`${err.name} Unauthorized access restricted`);
    return res.status(401).json({
      message: `Unauthorized access restricted.please login again`,
    });
  }
  // Mongo Validation Error Handler
  else if (err.name === "ValidationError") {
    console.error("ValidationError");
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
  //   return res.status(500).json({
  //     status: "error",
  //     operational: false,
  //     message: "Something went wrong!",
  // });
};
