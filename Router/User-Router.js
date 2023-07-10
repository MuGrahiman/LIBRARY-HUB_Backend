import { Router } from "express";
import {
  ADDUser,
  FetchUser,
  SingleUser,
  ToggleUser,
  updateUser,
} from "../Controller/UserController";
import { uploader } from "../utils/multer-utils";

const userRouter = Router();
userRouter.get("/fetch", FetchUser);
userRouter.post("/add", ADDUser);
userRouter.route("/single")
  .get(SingleUser)
  .put(uploader.single("CoverBook"), updateUser);
userRouter.patch("/remove", ToggleUser);

export default userRouter;
