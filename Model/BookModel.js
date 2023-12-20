import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
    LibraryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Library",
        required: true,
      },
    Title: {
        type:String,
        required:true,
    },
    Author: {
        type:String,
        required:true,
    },
    Cost: {
        type:Number,
        required:true,
    },
    ISBN: {
        type:Number,
        required:true,
    },
    Description: {
        type:String,
        required:true,
    },
    Genres: {
        type:String,
        required:true,
    },
    Publisher: {
        type:String,
        required:true,
    },
    publishDate: {
        type:Date,
        required:true,
    },
    CoverBook: {
        type:String,
        required:true,
    },
    Booked: {
        type:Boolean,
        required:true,
        default:false,
    },
},{timestamps:true,});

// BookSchema.pre("findOne", function (next) {
//     this.populate("LibraryId")
//     next();
//   });
  
//   BookSchema.pre("find", function (next) {
//     this.populate("LibraryId")
//     next();
//   });

export const BookModel = new mongoose.model("Book",BookSchema);