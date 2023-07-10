import { Router } from "express";
import { FetchData, PostData ,Login,varifyOTP,resendOTP} from '../Controller/LibrarianController';
import uploadFile from "../Middleware/Upload-File";
const LibraryRouter = Router();
// LibraryRouter.use() use middleware for the authentication checking
LibraryRouter.get('/fetch', FetchData);
LibraryRouter.post('/add',PostData);
LibraryRouter.post('/login', Login);
LibraryRouter.post('/otp', varifyOTP);
LibraryRouter.get('/resend', resendOTP);

export default LibraryRouter;
      