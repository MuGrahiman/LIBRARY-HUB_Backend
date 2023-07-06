import { Router } from "express";
import { FetchLData, PostLData ,Login,varifyOTP,resendOTP} from '../Controller/LibrarianController';
import uploadFile from "../Middleware/Upload-File";
const router = Router();
// router.use() use middleware for the authentication checking
router.get('/fetch', FetchLData);
router.post('/add',uploadFile, PostLData);
router.post('/login', Login);
router.post('/otp', varifyOTP);
router.get('/resend', resendOTP);

export default router;
      