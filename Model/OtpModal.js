import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
  Email: { type: String, required: true },
  OTP: { type: Number, required: true },
  CreatedAt: { type: Date, default: Date.now(), expires: 600 },
});
const OTPModel = new mongoose.model("Otp", otpSchema);
export default OTPModel;
