import { Router } from "express";
import {
  ADDCategory,
  FetchCategory,
  RemoveCategory,
  SingleCategory,
  updateCategory,
} from "../Controller/CategoryController.js";

const categoryRouter = Router();
categoryRouter.get("/fetch", FetchCategory);
categoryRouter.post("/add", ADDCategory);
categoryRouter.route("/single").get(SingleCategory).put(updateCategory);
categoryRouter.delete("/remove", RemoveCategory);

export default categoryRouter;
