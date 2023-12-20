import expressAsyncHandler from "express-async-handler";
import { BookModel } from "../Model/BookModel.js";
import ErrorResponse from "../utils/Error-Utils.js";
import Cloudinary from "../Config/cloudinary-config.js";

export const FetchBooks = (req, res, next) => {
  console.log("FetchBooks", req.query);
  const { LibraryId } = req.query;
  try {
    BookModel.find({LibraryId})
      .then((result) => {
        res.json({ result });
      })
      .catch((err) => {
        console.log("FetchBooks errc");
        console.log(err.message);
        next(ErrorResponse.noDataFound(err.message.split(":")[1]));
      });
  } catch (error) {
    console.log("FetchBooks catch errc");
    next(error);
  }
};

export const ADDBooks = async (req, res, next) => {
  console.log(`in the controller `);
  console.log(req.body);
  console.log(req.file);
  console.log(req.token);
  try {
    const {
      Title,
      Author,
      Cost,
      Description,
      Genres,
      Publisher,
      publishDate,
      ISBN,
    } = req.body;
    // Upload the file to Cloudinary
    // const result = await Cloudinary.uploader
    //   .upload(req.file.path)
    //   .then((re) => console.log(re))
    //   .catch((err) => console.log(err));
    // console.log(result);
    const CoverBook = req.file.path;

    const existBook = await BookModel.findOne({ ISBN });
    console.log(existBook);
    if (existBook)
      return next(ErrorResponse.forbidden("Book is already uploaded"));

    const books = new BookModel({
      Title,
      Author, 
      Cost,
      Description,
      Genres,
      Publisher,
      publishDate,
      CoverBook,
      ISBN,
      LibraryId: req.token,
    });
    books
      .save()
      .then((result) => res.json({ result }))
      .catch((err) => {
        console.log(`in the controller ${err}`);
        next(ErrorResponse.internalError(err.message.split(": ")[1]));
      });
  } catch (error) {
    next(error);
  }
};

export const SingleBooks = expressAsyncHandler((req, res, next) => {
  console.log(`in the single book`);
  try {
    const { Id } = req.query;
    BookModel.findById(Id)
      .then((result) => res.json({ result }))
      .catch((err) => {
        console.log(`in the controller ${err}`);
        next(ErrorResponse.internalError(err.message.split(": ")[1]));
      });
  } catch (error) {
    next(error);
  }
});

export const updateBook = expressAsyncHandler((req, res, next) => {
  console.log(`in the updated book ${req.body}`);
  const { Id } = req.query;
  try {
    const {
      Title,
      Author,
      Cost,
      Description,
      ISBN,
      Genres,
      Publisher,
      publishDate,
    } = req.body;
    const CoverBook = req.file.path;
    BookModel.findByIdAndUpdate(Id, {
      Title,
      Author,
      Cost,
      Description,
      Genres,
      Publisher,
      publishDate,
      CoverBook,
      ISBN,
    })
      .then((result) => res.json({ result }))
      .catch((err) => {
        console.log(`in the controller ${err}`);
        next(ErrorResponse.internalError(err.message.split(": ")[1]));
      });
  } catch (error) {
    next(error);
  }
});

export const DeleteBooks = expressAsyncHandler((req, res) => {
  console.log(req.body);
});
