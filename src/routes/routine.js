import express from 'express';

import { validateAuth } from '../middlewares/index.js';
import {
  createRoutine,
  getRoutineById,
  getRoutines,
} from '../controllers/routine/index.js';

const router = express.Router();

router.post('/addRoutine', validateAuth, createRoutine);

router.get('/getRoutine', validateAuth, getRoutines);

router.get('/getRoutine/:id', validateAuth, getRoutineById);

export default router;
