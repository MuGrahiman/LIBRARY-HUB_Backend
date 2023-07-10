import dotenv from "dotenv";
import { JWTToken, verifyToken } from "../utils/JWT-Utils";
import ErrorResponse from "../utils/Error-Utils";

dotenv.config();

export const varifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const { role } = req.query;
  console.log(authorization,role)
  if (!authorization) {
    throw ErrorResponse.forbidden("Authorization token required");
    // return res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];
  console.log(token);
  try {
    const decoded = verifyToken(token);
    if (role === "admin") {
      if (decoded.id === process.env.ADMIN_ID && decoded.role === role) {
        // req.token = decoded
        next();
      } else {
        throw ErrorResponse.unauthorized("Authorization failed");
        // res.json({ admin: false });
      }
    } else if (role === "library") {
    } else if (role === "user") {
    } else {
      throw ErrorResponse.forbidden("Authorization not allowed");
    }
  } catch (error) {
    console.log(`error in the try catch ${error}`); 
    next(error)
    // return res.status(401).json({ error: "request is not authorized" });
  }
};
