import { Router } from "express";
import { FetchBooks, ADDBooks, SingleBooks,updateBook,DeleteBooks } from '../Controller/BooksController.js';
import uploadFile from "../Middleware/Upload-File.js";
import {uploader} from "../utils/multer-utils.js";
import { varifyToken } from "../Middleware/Varify-token.js";
const router = Router();

//Books Route
router.get('/fetch', FetchBooks);
router.post('/add',varifyToken,uploader.single('CoverBook'), ADDBooks);
router.get('/single', SingleBooks);
router.put('/single',uploader.single('CoverBook'),updateBook);
router.delete('/remove', DeleteBooks); 

export default router;
   