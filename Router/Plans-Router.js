import { Router } from "express";
import {
  ADDLibraryPlans,
  DeleteAdminPlans,
  DeleteLibraryPlans,
  FetchAdminPlans,
  FetchLibraryPlans,
  updateSingleAdminPlans,
  updateSingleLibraryPlans,
  ADDAdminPlans,
  SingleAdminPlans,
} from "../Controller/PlansController";
const Plan = Router();

//admin Plan Route
Plan.get("/admin/fetch", FetchAdminPlans);
Plan.post("/admin/add", ADDAdminPlans);
Plan.route("/admin/single").get(SingleAdminPlans).put(updateSingleAdminPlans);
Plan.delete("/admin/remove", DeleteAdminPlans);
//library Plan Route
Plan.get("/library/fetch", FetchLibraryPlans);
Plan.post("/library/add", ADDLibraryPlans);
Plan.route("/library/single").get(updateSingleLibraryPlans).put(updateSingleLibraryPlans);
Plan.delete("/library/remove", DeleteLibraryPlans);

export default Plan;
