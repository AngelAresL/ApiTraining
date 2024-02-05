import express from 'express';

import { validateAuth } from '../middlewares/index.js';
import {
  addToRoutine,
  createRoutine,
  getRoutineById,
  getRoutines,
  searchTrainingRoutine,
} from '../controllers/routine/index.js';

const router = express.Router();

router.post('/addRoutine', validateAuth, createRoutine);

router.get('/getRoutine', validateAuth, getRoutines);

router.get('/getRoutine/:id', validateAuth, getRoutineById);
router.post('/addTrainingToRoutine/:idRoutine', validateAuth, addToRoutine);
router.get('/getTrainingRoutine/:idRoutine',validateAuth,searchTrainingRoutine)

export default router;
