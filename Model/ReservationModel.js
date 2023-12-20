// const mongoose = require("mongoose");
import mongoose from "mongoose";
// Define your schema and model
const ReservationSchema = new mongoose.Schema(
  {
    LibraryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Library",
      required: true,
    },
    BookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expires: { type: Number, default: 14, required: true }, // Field to store the initial expiration value
    remainingDays: {
      type: Number,
      default: function () {
        // Calculate the remaining days based on the current date and the 'expires' value
        const currentDate = new Date();
        const expirationDate = new Date(
          currentDate.getTime() + this.expires * 24 * 60 * 60 * 1000
        );
        const remainingTime = expirationDate - currentDate;
        return Math.ceil(remainingTime / (24 * 60 * 60 * 1000));
      },
      min: 0,
    },
  },
  { timestamps: true }
);


// ReservationSchema.pre("findOne", function (next) {
//   this.populate("LibraryId").populate("BookId").populate("UserId");
//   next();
// });

// ReservationSchema.pre("find", function (next) {
//   this.populate("LibraryId").populate("BookId").populate("UserId");
//   next();
// });


export const ReservationModel = mongoose.model(
  "Reservation",
  ReservationSchema
);
