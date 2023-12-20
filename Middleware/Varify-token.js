import dotenv from "dotenv";
import {  verifyToken } from "../utils/JWT-Utils.js";
import ErrorResponse from "../utils/Error-Utils.js";
import { LibraryModel } from "../Model/LibraryModel.js";

dotenv.config();

export const varifyToken = async (req, res, next) => {
  console.log("varify Token");
  const { authorization } = req.headers;
  const { Role } = req.query;
  console.log(authorization, Role);
  if (!authorization || !Role)
    next(ErrorResponse.forbidden("Authorization required"));

  const token = authorization.split(" ")[1];
  console.log(`Token : ${token}`);
  if (token === 'null')
    next(ErrorResponse.forbidden("Authorization token required"));
   
  try {
    const decoded = verifyToken(token);                    
    console.log(decoded);    
    if (Role === "admin") {
      console.log(Role);
      if (decoded.id === process.env.ADMIN_ID && decoded.role === Role) {
        next();
      } else {
        throw ErrorResponse.unauthorized("Authorization failed");
      }
    } else if (Role === "library") {
      console.log(Role);
      const result = await LibraryModel.findById({ _id: decoded.id });
      if (result) {
        console.log(result);
        req.token = decoded.id;
        next();
      } else {
        throw ErrorResponse.unauthorized("Authorization failed");
      }
    } else if (Role === "user") {
      console.log(Role);
    } else {
      next(ErrorResponse.forbidden("Authorization not allowed"));
    }
  } catch (error) {
    console.log(`error in the try catch ${error}`);
    next(error);
    // return res.status(401).json({ error: "request is not authorized" });
  }
};
