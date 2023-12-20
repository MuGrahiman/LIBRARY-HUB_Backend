import expressAsyncHandler from "express-async-handler";
import { sendMail } from "../Middleware/mail-Generator.js";
import { UserModel } from "../Model/UserModel.js";
import ErrorResponse from "../utils/Error-Utils.js";
import { RandomGenerator } from "../utils/RandomGenerator.js";
import dotenv from "dotenv";
import OTPModel from "../Model/OtpModal.js";
dotenv.config();
const session = {};

export const Login = async (req, res, next) => {
  const { Email } = req.body;
  console.log(Email);
  try {
    const existEmail = await UserModel.findOne({ Email });
    console.log(existEmail);
    if (!existEmail) {
      return next(ErrorResponse.unAuthorized("Email is not Valid"));
    } else {
      // ----------------mail option-----------------
      let OTP = generateOTP();
      console.log(OTP);
      session.User = existEmail;
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
      sendMail(mailOptions).then((result) => res.json({ result, OTP }));
    }
  } catch (error) {
    console.log(`in the try catch error library login ${error}`);
    next(error);
  }
};

export const varifyOTP = expressAsyncHandler(async (req, res, next) => {
  console.log(session);
  const { _id } = session.User;
  const OTP = req.body.join("").replace(/[ ,]/g, "");
  if (session.OTP == OTP) {
    const token = await generateToken(_id, "librarian");
    res.json({ success: token, id: _id });
  } else {
    next(ErrorResponse.unAuthorized("OTP is not Valid"));
  }
});

export const resendOTP = expressAsyncHandler(async (req, res, next) => {
  const { Email } = session.User;
  console.log(session.User);
  const result = await UserModel.findOne({ Email });
  console.log(result);
  if (!result) {
    return next(ErrorResponse.unAuthorized("Email is not Valid"));
  } else {
    // ----------------mail option-----------------
    let OTP = generateOTP();
    console.log(OTP);
    session.User = Email;
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

export const FetchUser = (req, res, next) => {
  console.log("fetch user");
  try {
    UserModel.find()
      .then((result) => res.json({ result }))
      .catch((err) => {
        console.log(`in the controller ${err}`);
        next(ErrorResponse.internalError(err.message.split(": ")[1]));
      });
  } catch (error) {
    next(error);
  }
};

export const ADDUser = async (req, res, next) => {
  console.log("add user");
  try {
    console.log(req.token);

    const {
      Name,
      Email,
      PhoneNo,
      PinNo,
      Gender,
      Country,
      State,
      City,
      Area,
      LandMark,
      District,
      DOB,
      Post,
      House,
      Occupation,
    } = req.body;
    const LibraryCode = RandomGenerator(6);
    const LibraryId = req.token.id;
    console.log(LibraryCode);

    const existEmail = await UserModel.findOne({ Email });
    console.log(existEmail);
    if (existEmail)
      return next(ErrorResponse.forbidden("Email is already in use"));

    const users = new UserModel({
      Name,
      Email,
      PhoneNo,
      Gender,
      DOB,
      Occupation,
      LibraryCode,
      LibraryId,
      Address: {
        House,
        Post,
        Country,
        State,
        District,
        City,
        Area,
        LandMark,
        PinNo,
      },
    });
    users
      .save()
      .then((result) => res.json({ result }))
      .catch((err) => {
        console.log(`in the controller ${err}`);
        next(ErrorResponse.internalError(err.message.split(": ")[1]));
      });
  } catch (error) {
    next(error);
  }
};

export const SingleUser = (req, res, next) => {
  try {
  } catch (error) {}
};

export const updateUser = (req, res, next) => {
  try {
  } catch (error) {}
};

export const ToggleUser = (req, res, next) => {
  try {
    const { UserId } = req.query;
    UserModel.findById(UserId)
      .then((res) => {
        console.log("user:", res);

        return UserModel.findByIdAndUpdate(
          UserId,
          { isBlocked: !res.isBlocked },
          { new: true }
        );
      })
      .then((updatedUser) => {
        console.log("Updated user:", updatedUser);
        if (updatedUser) res.json({ result: updatedUser });
        else next(ErrorResponse.noDataFound("user"));
      })
      .catch((error) => {
        next(ErrorResponse.internalError(err.message.split(": ")[1]));
      });
  } catch (error) {}
};
