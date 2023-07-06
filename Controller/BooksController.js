import expressAsyncHandler from "express-async-handler";

export const FetchBooks = expressAsyncHandler((req, res) => {
    console.log(req.body)
});

export const ADDBooks = expressAsyncHandler((req, res) => {
    console.log(req.body)
});

export const SingleBooks = expressAsyncHandler((req, res) => {
    console.log(req.body)
});

export const updateBook = expressAsyncHandler((req, res) => {
    console.log(req.body)
});

export const DeleteBooks = expressAsyncHandler((req, res) => {
    console.log(req.body)
});
