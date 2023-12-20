import { CategoryModel } from "../Model/CategoryModel.js";
import ErrorResponse from "../utils/Error-Utils.js";

export const FetchCategory = (req, res, next) => {
  try {
    CategoryModel.find()
      .then((result) => res.json({ result }))
      .catch((err) =>
        next(ErrorResponse.internalError(err.message.split(": ")[1]))
      );
  } catch (error) {
    next(error);
  }
};
export const ADDCategory = (req, res, next) => {
  const { Name } = req.body;
  try {
    console.log(Name);
    const category = new CategoryModel({
      ...req.body,
    });
    category
      .save()
      .then((result) => res.json({ result }))
      .catch((err) =>
        next(ErrorResponse.internalError(err.message.split(": ")[1]))
      );
  } catch (error) {
    next(error);
  }
};
export const SingleCategory = (req, res, next) => {
  try {
  } catch (error) {}
};
export const updateCategory = (req, res, next) => {
  const { Name,ID } = req.body;
  const {categoryId} = req.query;
  console.log(Name)
  try {
    CategoryModel.findByIdAndUpdate(categoryId, { Name })
      .then((result) => res.json({ result }))
      .catch((err) =>
        next(ErrorResponse.internalError(err.message.split(": ")[1]))
      );
  } catch (error) {
    next(error);
  }
};

export const RemoveCategory = (req, res, next) => {
console.log(req.query.categoryId)
  try {
    CategoryModel.findByIdAndDelete({
        _id: req.query.categoryId,
      }).then((result) => res.json({ success: result }))
      .catch((err) =>
        next(ErrorResponse.internalError(err.message.split(": ")[1]))
      );
    
  } catch (error) {next(error)}
};
