import { Router } from "express";
import {
  ADDUser,
  FetchUser,
  SingleUser,
  ToggleUser,
  updateUser,
  Login,
  varifyOTP,
  resendOTP,
} from "../Controller/UserController.js";
import { uploader } from "../utils/multer-utils.js";
import { varifyToken } from "../Middleware/Varify-token.js";

const userRouter = Router();
userRouter.post("/login", Login);
userRouter.post("/otp", varifyOTP);
userRouter.get("/resend", resendOTP);

userRouter.get("/fetch", FetchUser);
userRouter.post("/add", varifyToken, ADDUser);
userRouter
  .route("/single")
  .get(SingleUser)
  .put(uploader.single("userProfile"), updateUser);
userRouter.patch("/remove", ToggleUser);

export default userRouter;
