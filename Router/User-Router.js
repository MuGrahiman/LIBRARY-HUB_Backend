import { Router } from "express";
import {
  ADDUser,
  FetchUser,
  SingleUser,
  ToggleUser,
  updateUser,
} from "../Controller/UserController";
import { uploader } from "../utils/multer-utils";
import { varifyToken } from "../Middleware/Varify-token";

const userRouter = Router();
userRouter.get("/fetch", FetchUser);
userRouter.post("/add",varifyToken, ADDUser);
userRouter.route("/single")
  .get(SingleUser)
  .put(uploader.single("userProfile"), updateUser);
userRouter.patch("/remove", ToggleUser);

export default userRouter;
