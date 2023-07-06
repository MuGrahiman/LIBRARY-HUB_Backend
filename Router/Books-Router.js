import { Router } from "express";
import { FetchBooks, ADDBooks, SingleBooks,updateBook,DeleteBooks } from '../Controller/BooksController';
import uploadFile from "../Middleware/Upload-File";
import {uploader} from "../utils/multer-utils";
const router = Router();

//Books Route
router.get('/fetch', FetchBooks);
router.post('/add',uploadFile, ADDBooks);
router.get('/single', SingleBooks);
router.put('/single', updateBook);
router.delete('/remove', DeleteBooks);

export default router;
 