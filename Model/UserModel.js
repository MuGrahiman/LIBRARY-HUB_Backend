import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    LibraryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Library",
      required: true,
    },
    LibraryCode: {
      type: String,
      required: true,
    },
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    PhoneNo: {
      type: Number,
      required: true,
    },
    Gender: {
      type: String,
      required: true,
    },
    DOB: {
      type: Date,
      required: true,
    },
    Occupation: {
      type: String,
      required: true,
    },
    Address: {
      House: {
        type: String,
        required: true,
      },
      Post: {
        type: String,
        required: true,
      },
      Country: {
        type: String,
        required: true,
      },
      State: {
        type: String,
        required: true,
      },
      District: {
        type: String,
        required: true,
      },
      City: {
        type: String,
        required: true,
      },
      Area: {
        type: String,
        required: true,
      },
      LandMark: {
        type: String,
        required: true,
      },
      PinNo: {
        type: Number,
        required: true,
      },
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// UserSchema.pre("findOne", function (next) {
//   this.populate("LibraryId")
//   next();
// });

// UserSchema.pre("find", function (next) {
//   this.populate("LibraryId")
//   next();
// });

export const UserModel = new mongoose.model("User", UserSchema);
