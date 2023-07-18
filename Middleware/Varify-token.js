import dotenv from "dotenv";
import { JWTToken, verifyToken } from "../utils/JWT-Utils";
import ErrorResponse from "../utils/Error-Utils";
import { LibraryModel } from "../Model/LibraryModel";

dotenv.config();

export const varifyToken = async (req, res, next) => {
    console.log('varify Token')
    const { authorization } = req.headers;
  const { Role } = req.query;
  console.log(authorization, Role);
  if (!authorization) {
    next(ErrorResponse.forbidden("Authorization token required")) 
    // return res.status(401).json({ error: "Authorization token required" });
  } 
  const token = authorization.split(" ")[1];
  console.log(token);
  try {
    const decoded = verifyToken(token);
    console.log(decoded); 
    if (Role === "admin") {
      console.log(Role);
      if (decoded.id === process.env.ADMIN_ID && decoded.role === Role) {
        // req.token = decoded
        next();
      } else {
        next(ErrorResponse.unauthorized("Authorization failed"));
        //) res.json({ admin: false });
      }
    } else if (Role === "library") {
      console.log(Role);
      const result = await LibraryModel.findById({ _id: decoded.id })
        .then((res) => { 
          req.token = decoded;
          next();
        })
        .catch((err) =>
          next(ErrorResponse.unauthorized("Authorization failed"))
        );
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
