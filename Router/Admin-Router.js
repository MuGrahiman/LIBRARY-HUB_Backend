import { Router } from "express";
import {  Login,adminToken } from '../Controller/AdminController.js';
const router = Router();

router.post('/verify-token', adminToken);
router.post('/login', Login);

export default router;  