import { BookModel } from "../Model/BookModel.js";
import { ReservationModel } from "../Model/ReservationModel.js";
import { UserModel } from "../Model/UserModel.js";
import ErrorResponse from "../utils/Error-Utils.js";
import { RandomGenerator } from "../utils/RandomGenerator.js";

export const FetchReservedData = async (req, res, next) => {
  console.log("fetch reserved data");
  try {
    const result = await ReservationModel.find();
    console.log(result);
    res.json({ result });
  } catch (error) {
    next(error);
  }
};

export const ADDReservedData = async (req, res, next) => {
  console.log("add reserved data");
  try {
    let BookId;
    let UserId = await UserModel.findOne({ LibraryCode: req.body.UserId })
      .then((result) => {
        console.log(result);
        if (!result) return next(ErrorResponse.noDataFound("User"));

        return result._id;
      })
      .catch((err) =>
        next(ErrorResponse.internalError(err.message.split(": ")[1]))
      );
    await BookModel.findOne({ ISBN: req.body.BookId })
      .then((result) => {
        console.log(result);

        if (!result) return next(ErrorResponse.noDataFound("Book"));

        if (result.Booked)
          return next(ErrorResponse.forbidden("Already Booked"));

        BookId = result._id;
      })
      .catch((err) =>
        next(ErrorResponse.internalError(err.message.split(": ")[1]))
      );
    console.log(UserId,BookId);

    if (UserId && BookId) {
      new ReservationModel({
        UserId,
        BookId,
      })
        .save()
        .then((result) => res.json({ result }))
        .catch((err) => {
          console.log(err);
          next(ErrorResponse.internalError(err.message.split(": ")[1]));
        });
    }
  } catch (error) {
    next(error);
  }
};

export const SingleReservedData = (req, res, next) => {
  try {
  } catch (error) {}
};

export const UpdateReservedData = (req, res, next) => {
  try {
  } catch (error) {}
};

export const DeleteReservedData = (req, res, next) => {
  try {
  } catch (error) {}
};
