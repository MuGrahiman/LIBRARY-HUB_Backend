import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    LibraryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Library",
      required: true,
    },
    Name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// CategorySchema.pre("findOne", function (next) {
//   this.populate("LibraryId");
//   next();
// });

// CategorySchema.pre("find", function (next) {
//   this.populate("LibraryId");
//   next();
// });

export const CategoryModel = new mongoose.model("Category", CategorySchema);
