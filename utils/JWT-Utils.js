import pkg from "jsonwebtoken";
import dotenv from "dotenv";
const { sign, verify } = pkg
dotenv.config();

export const generateToken = (id,role)=>{
 console.log(id,role)
    return sign({id,role},process.env.JWT_Key,{ expiresIn: '3d'})
}

//         varify the token 
export const verifyToken = (token) =>verify(token, process.env.JWT_Key );

// {
//     try {
//         verify(token, process.env.JWT_Key )
        
//     } catch (error) {
//         console.log(error)
//         return res.status(401).json({ error: 'request is not authorized' });
//     }
//     };
