import express from 'express';

import { validateAuth } from '../middlewares/index.js';
import {createRoutine} from '../controllers/routine/index.js';

const router = express.Router();

router.post('/addRoutine', validateAuth, createRoutine);

export default router;
