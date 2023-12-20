import { generateOTP, sendMail } from "../Middleware/mail-Generator.js";
import { LibraryModel } from "../Model/LibraryModel.js";
import dotenv from "dotenv";
import ErrorResponse from "../utils/Error-Utils.js";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils/JWT-Utils.js";
import OTPModel from "../Model/OtpModal.js";
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
export const PostData = async (req, res, next) => {
  const {
    Name,
    PhoneNo,
    Email,
    Country,
    State,
    City,
    Area,
    LandMark,
    PinNo,
    District,
    Latitude,
    Longitude,
  } = req.body;
  try {
    //  const existEmail = await LibraryModel.find({Email});
    //  if(existEmail)next(ErrorResponse.forbidden('Mail is already used'));
    const existEmail = await LibraryModel.findOne({ Email });
    console.log(existEmail);

    if (existEmail) {
      return next(ErrorResponse.forbidden("Email is already in use"));
    }

    const LibraryData = new LibraryModel({
      Name,
      PhoneNo,
      Email,
      Country,
      State,
      City,
      Area,
      LandMark,
      PinNo,
      District,
      Longitude,
      Latitude,
    });
    LibraryData.save()
      .then((result) => {
        console.log(`success ${result}`);
        res.json({ success: result });
      })
      .catch((err) =>
        next(ErrorResponse.internalError(err.message.split(": ")[1]))
      );
  } catch (error) {
    next(error);
  }
};

export const Login = async (req, res, next) => {
  const { Email } = req.body;
  try {
    const existEmail = await LibraryModel.findOne({ Email });
    console.log(existEmail);
    if (!existEmail) {
      return next(ErrorResponse.unAuthorized("Email is not Valid"));
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
      const otpdata = new OTPModel({ Email, OTP });
      console.log(otpdata);
      await otpdata.save();
      sendMail(mailOptions).then((result) => res.json({ id: otpdata._id }));
    }
  } catch (error) {
    console.log(`in the try catch error library login ${error}`);
    next(error);
  }
};

export const varifyOTP = expressAsyncHandler(async (req, res, next) => {
  // const { _id } = session.Librarian;
  const { Id } = req.query;
  console.log(req.body);
  if (!Id) return next(ErrorResponse.unAuthorized("Invalid Credentials"));
  const existOtp = await OTPModel.findById(Id);
  console.log(existOtp);
  if (!existOtp)
    return next(
      ErrorResponse.unAuthorized(
        "Otp Time Out.Please Enter your Mail Address Once More!!.."
      )
    );
  const OTPString = req.body.join("").replace(/[ ,]/g, "");
  const OTP = parseInt(OTPString);
  console.log(typeof OTP);
  if (existOtp.OTP === OTP) {
    const token = await generateToken("_id", "librarian");
    res.json({ success: token });
  } else {
    next(ErrorResponse.unAuthorized("OTP is not Valid"));
  }
});

export const resendOTP = expressAsyncHandler(async (req, res, next) => {
  const { Email } = session.Librarian;
  console.log(session.Librarian);
  const result = await LibraryModel.findOne({ Email });
  console.log(result);

  const { Id } = req.query;
  console.log(req.body);
  if (!Id) return next(ErrorResponse.unAuthorized("Invalid Credentials"));
  const existOtp = await OTPModel.findById(Id);
  console.log(existOtp);
  if (!existOtp)
    return next(
      ErrorResponse.unAuthorized(
        "Otp Time Out.Please Enter your Mail Address Once More!!.."
      )
    );
  else {
    // ----------------mail option-----------------
    let OTP = generateOTP();
    console.log(OTP);
   
    let mailOptions = {
      from: process.env.NodeMailer_Pass,
      to: existOtp.Email,
      subject: "OTP Varification",
      html: `<p>this is your OTP ${OTP}</p>`, 
    };
    const otpdata = new OTPModel({Email: existOtp.Email, OTP });
    console.log(otpdata);
    await otpdata.save();
    sendMail(mailOptions).then((result) => res.json({ id: otpdata._id }));
  }
});
