import { Router } from "express";
import { FetchLPlans, ADDLPlans, SingleLPlans,updateSingleLPlans,DeleteLPlans } from '../Controller/PlansController';
const router = Router();

//admin Plan Route
router.get('/admin/fetch', FetchLPlans);
router.post('/admin/add', ADDLPlans);
router.get('/admin/single', SingleLPlans);
router.put('/admin/single', updateSingleLPlans);
router.delete('/admin/remove', DeleteLPlans);

export default router;
 