import mongoose from "mongoose";

const Library = new mongoose.Schema({
  LName: {
        type: String,
        required:true,
  },
  LPhoneNo: {
        type: Number,
        required:true,
  },

  LEmail: {
        type: String,
        required:true,
  },
  LContry: {
        type: String,
        required:true,
  },
  LState: {
        type: String,
        required:true,
  },
  LCity: {
        type: String,
        required:true,
  },
  LArea: {
        type: String,
        required:true,
  },
  LLandMark: {
        type: String,
        required:true,
  },
  LPinNo: {
        type: Number,
        required:true,
  },
  LLogo: {
        type: String,
        required:true,
  },
},{timestamps:true});

export const LibraryModel = new mongoose.model("Library", Library);
