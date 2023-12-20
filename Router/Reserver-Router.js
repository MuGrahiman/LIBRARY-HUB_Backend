import { Router } from "express";
import { uploader } from "../utils/multer-utils.js";
import { varifyToken } from "../Middleware/Varify-token.js";
import {
  ADDReservedData,
  DeleteReservedData,
  FetchReservedData,
  SingleReservedData,
  UpdateReservedData,
} from "../Controller/ReserverController.js";

const reserverRouter = Router();
reserverRouter.get("/fetch", FetchReservedData);
reserverRouter.post("/add", ADDReservedData);
reserverRouter
  .route("/single")
  .get(SingleReservedData)
  .put(UpdateReservedData);
reserverRouter.patch("/remove", DeleteReservedData);

export default reserverRouter;
