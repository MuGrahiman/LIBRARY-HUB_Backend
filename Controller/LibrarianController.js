import { generateOTP, sendMail } from "../Middleware/mail-Generator";
import {LibraryModel} from "../Model/LibraryModel";
import dotenv from "dotenv";
import ErrorResponse from "../utils/Error-Utils";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils/JWT-Utils";
dotenv.config();
const session = {};
export const FetchData = async (req, res) => {
  try {
    const result = await LibraryModel.find({});
    console.log("success", result);
    if (result) res.json({ result });
    else res.json({ result });
  } catch (error) {}
};
export const PostData =async (req,res,next) => {
  
  const {
    Name,
    PhoneNo,
    Email,
    Contry,
    State,
    City,
    Area,
    LandMark,
    PinNo,
    District,
  } = req.body;
  try {
    //  const existEmail = await LibraryModel.find({Email});
    //  if(existEmail)next(ErrorResponse.forbidden('Mail is already used'));
     const existEmail = await LibraryModel.findOne({ Email });
     console.log(existEmail)

     if (existEmail) {
       return next(ErrorResponse.forbidden('Email is already in use'));
     }
 
    const LibraryData = new LibraryModel({
      Name,
      PhoneNo,
      Email,
      Contry,  
      State,
      City,
      Area,
      LandMark,
      PinNo,
      District,
    });
    LibraryData.save()
      .then((result) => {
        console.log(`success ${result}`);
        res.json({ success: result });
      })
      .catch((err) => next(ErrorResponse.internalError(err.message.split(": ")[1])));
  } catch (error) {
    next(error);
  }
};

export const Login = async (req, res, next) => {
  const { Email } = req.body;
  try {
    const existEmail = await LibraryModel.findOne({Email});
    console.log(existEmail);
    if (!existEmail) {
     return next( ErrorResponse.unAuthorized("Email is not Valid"))
    } else {
      // ----------------mail option-----------------
      let OTP = generateOTP();
      console.log(OTP);
      session.Librarian = existEmail;
      session.OTP = OTP;
 
      let mailOptions = {
        from: process.env.NodeMailer_Pass,
        to: Email,
        subject: "OTP Varification",
        html: `<p>this is your OTP ${OTP}</p>`,
      };

      sendMail(mailOptions).then((result) => res.json({ result, OTP }));
    }
  } catch (error) {
    console.log(`in the try catch error library login ${error}`);
    next(error);
  }
};

export const varifyOTP = expressAsyncHandler(async (req, res, next) => {
  const { _id } = session.Librarian;
  const OTP = req.body.join("").replace(/[ ,]/g, "");
  if (session.OTP == OTP) {
    const token = await generateToken(_id, "librarian");
    res.json({ success: token });
  } else {
    next (ErrorResponse.unAuthorized("OTP is not Valid"));
  }
});

export const resendOTP = expressAsyncHandler(async (req, res, next) => {
  const {Email} = session.Librarian;
  console.log(session.Librarian);
  const result = await LibraryModel.findOne({  Email });
  console.log(result);
  if (!result) {
   return next(ErrorResponse.unAuthorized("Email is not Valid"));
  } else {
    // ----------------mail option-----------------
    let OTP = generateOTP();
    console.log(OTP);
    session.Librarian = Email;
    session.OTP = OTP;
    let mailOptions = {
      from: process.env.NodeMailer_Pass,
      to: Email,
      subject: "OTP Varification",
      html: `<p>this is your OTP ${OTP}</p>`,
    };
    sendMail(mailOptions).then((result) => res.json({ result, OTP }));
  }
});
