import dotenv from "dotenv";
import { generateToken, verifyToken } from "../utils/JWT-Utils";
import ErrorResponse from "../utils/Error-Utils";

dotenv.config();

const adminToken = async (req, res) => {
  try {
    const token = req.body.token;
    const role = req.body.role;
    if (!token) {
      res.json({ status: false });
    } else {
      const decoded = verifyToken(token);
      const adminId = decoded.email;
      console.log(decoded.email, decoded.role);

      if (decoded.email === process.env.ADMIN && decoded.role === role) {
        res.status(200).json({ status: true });
      } else { 
        res.json({ admin: false });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

const Login = async (req, res, next) => {
  const { Email, Password } = req.body;
  try {
    if (Email !== process.env.ADMIN) {
      console.log("Email running");
      throw ErrorResponse.unAuthorized("Email is not Valid");
    } else if (Password !== process.env.ADMIN_ID) {
      console.log("Password running");
      throw ErrorResponse.unAuthorized("Password is not Valid");
    } else {
      const token = await generateToken(process.env.ADMIN_ID, "admin");
      console.log("success running", token);
      res.json({ success: token });
    }
  } catch (error) {
    next(error);
  }
};

export { Login, adminToken };
