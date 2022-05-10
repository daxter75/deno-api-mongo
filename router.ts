import { Router} from "https://deno.land/x/oak@v10.5.1/mod.ts";
import {getActivities, getActivity, addActivity, updateActivity, deleteActivity} from './controllers/activity-controller.ts';

const router = new Router();

router.get('/api/v1/activities', getActivities)
router.get('/api/v1/activities/:id', getActivity)
router.post('/api/v1/activities', addActivity)
router.put('/api/v1/activities/:id', updateActivity)
router.delete('/api/v1/activities/:id', deleteActivity)

export default router;