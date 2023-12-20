import mongoose from "mongoose";

const LibraryPlanSchema = new mongoose.Schema(
  {
    LibraryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Library",
      required: true,
    },
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

// LibraryPlanSchema.pre("findOne", function (next) {
//   this.populate("LibraryId");
//   next();
// });

// LibraryPlanSchema.pre("find", function (next) {
//   this.populate("LibraryId");
//   next();
// });

 const LibraryPlanModal = new mongoose.model("LibraryPlan", LibraryPlanSchema);
export default LibraryPlanModal;
