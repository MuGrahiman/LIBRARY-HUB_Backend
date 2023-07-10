import { generateOTP, sendMail } from "../Middleware/mail-Generator";
import LibraryModel from "../Model/LibraryModel";
import dotenv from "dotenv";
import ErrorResponse from "../utils/Error-Utils";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils/JWT-Utils";
dotenv.config();
const session = {};
const FetchLData = async (req, res) => {
  try {
    const result = await LibraryModel.find({});
    console.log("success", result);
    if (result) res.json({ result });
    else res.json({ result });
  } catch (error) {}
};
const PostLData = (req, res) => {
  const {
    LName,
    LPhoneNo,
    LEmail,
    LContry,
    LState,
    LCity,
    LArea,
    LLandMark,
    LPinNo,
  } = req.body;
  const { path: LLogo = "" } = req.file;
  try {
    const LibraryData = new LibraryModel({
      LName,
      LPhoneNo,
      LEmail,
      LContry,
      LState,
      LCity,
      LArea,
      LLandMark,
      LPinNo,
      LLogo,
    });
    LibraryData.save({ timeout: 20000 })
      .then((result) => {
        console.log(`success ${result}`);
        res.json({ success: result });
      })
      .catch((err) => console.log(err), res.json({ failed: err }));
  } catch (error) {
    console.log(error);
  }
};

const Login = async (req, res, next) => {
  const { Email } = req.body;
  try {
    const result = await LibraryModel.find();
    console.log(result);
    if (!result) {
      throw ErrorResponse.unAuthorized("Email is not Valid");
    } else {
      // ----------------mail option-----------------
      let OTP = generateOTP();
      console.log(OTP);
      session.Librarian = result;
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

const varifyOTP = expressAsyncHandler(async (req, res, next) => {
  const { _id } = session.Librarian;
  const OTP = req.body.join("").replace(/[ ,]/g, "");
  if (session.OTP == OTP) {
    const token = await generateToken(_id, "librarian");
    res.json({ success: token });
  } else {
    throw ErrorResponse.unAuthorized("OTP is not Valid");
  }
});

const resendOTP = expressAsyncHandler(async (req, res, next) => {
  const Email = session.Librarian.LEmail;
  console.log(session.Librarian);
  const result = await LibraryModel.findOne({ LEmail: Email });
  console.log(result);
  if (!result) {
    throw ErrorResponse.unAuthorized("Email is not Valid");
  } else {
    // ----------------mail option-----------------
    let OTP = generateOTP();
    console.log(OTP);
    session.Librarian = result;
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

export { FetchLData, PostLData, Login, varifyOTP, resendOTP };
