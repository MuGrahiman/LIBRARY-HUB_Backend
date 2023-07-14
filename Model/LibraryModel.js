import mongoose from "mongoose";

const Library = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    PhoneNo: {
      type: Number,
      required: true,
    },

    Email: {
      type: String,
      required: true,
    },
    Contry: {
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
    //   Logo: {
    //         type: String,
    //         required:true,
    //   },
  },
  { timestamps: true }
);

export const LibraryModel = new mongoose.model("Library", Library);
