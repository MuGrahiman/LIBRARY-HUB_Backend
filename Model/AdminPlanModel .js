import mongoose from "mongoose";

const AdminPlanSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required:true,
    },
    Duration: {
      type: String,
      required:true,
    },
    Amount: {
      type: Number,
      required:true,
    },
  },
  { timestamps: true } // Add the timestamps option to automatically create createdAt and updatedAt fields
);

const AdminPlanModel = new mongoose.model("AdminPlan", AdminPlanSchema);
export default AdminPlanModel;
