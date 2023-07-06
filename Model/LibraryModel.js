import mongoose from "mongoose";

const Librarian = new mongoose.Schema({
  LName: {
    type: String,
  },
  LPhoneNo: {
    type: Number,
  },

  LEmail: {
    type: String,
  },
  LContry: {
    type: String,
  },
  LState: {
    type: String,
  },
  LCity: {
    type: String,
  },
  LArea: {
    type: String,
  },
  LLandMark: {
    type: String,
  },
  LPinNo: {
    type: Number,
  },
  LLogo: {
    type: String,
  },
});

const LibrarianData = new mongoose.model("Librarian", Librarian);
module.exports = LibrarianData;
