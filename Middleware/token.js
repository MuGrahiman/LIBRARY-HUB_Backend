import dotenv from "dotenv";
import { JWTToken, verifyToken } from "../utils/JWT-Utils";

dotenv.config();

export const varifyToken = async (req, res ,next) => {
  try {
    
    const token = req.header;
    const role = req.params.role;
    if(!token){
        res.json({ status: false });
        
    }else{
        const decoded  = verifyToken(token);
        const adminId = decoded.id 
        console.log(decoded.id,decoded.role)
        
        if (decoded.id === process.env.ADMIN_ID && decoded.role === role) {
             res.status(200).json({ status: true });
          }else{
            res.json({ admin: false });
          }  
    }
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }

};