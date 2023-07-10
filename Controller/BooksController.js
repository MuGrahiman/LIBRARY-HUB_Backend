import expressAsyncHandler from "express-async-handler";
import { BookModel } from "../Model/BookModel";
import ErrorResponse from "../utils/Error-Utils";

export const FetchBooks = (req, res, next) => {
  console.log("FetchBooks");
  try {
    BookModel.find()
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
  try {
    const { Title, Author, Cost, Description, Genres, Publisher, publishDate } =
      req.body;
    const CoverBook = req.file.path;
    const books = new BookModel({
      Title,
      Author,
      Cost,
      Description,
      Genres,
      Publisher,
      publishDate,
      CoverBook,
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

export const SingleBooks = expressAsyncHandler((req, res,next) => {
  console.log(`in the single book`);
  try {
  
  const {Id} = req.query;
  BookModel.findById(Id)
  .then((result) => res.json({ result }))
  .catch((err) => {
    console.log(`in the controller ${err}`);
    next(ErrorResponse.internalError(err.message.split(": ")[1]));
  });
    
} catch (error) {
  next(error)
}
});

export const updateBook = expressAsyncHandler((req,res,next) => {
  console.log(`in the updated book ${req.body}`);
  const {Id} = req.query;
  try {
    const { Title, Author, Cost, Description,ISBN, Genres, Publisher, publishDate } =
      req.body;
    const CoverBook = req.file.path;
    BookModel.findByIdAndUpdate(Id,{
      Title,
      Author,
      Cost,
      Description,
      Genres,
      Publisher,
      publishDate,
      CoverBook,ISBN
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
