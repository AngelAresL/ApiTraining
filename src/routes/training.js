import express from 'express';
import {validateAuth} from '../middlewares/index.js';
import {createTraining, deleteTraining, modifyTraining, searchTraining, searchTrainingById} from '../controllers/training/index.js';



const router = express.Router();

//training create
router.post('/training', validateAuth, createTraining);
//training delete
router.delete("/training", validateAuth, deleteTraining)
router.delete('/training/:idtraining', validateAuth, deleteTraining);
//training modify (put y path)
router.put('/training/:idtraining', validateAuth, modifyTraining);
//training seleccionar todo y/o por tipologia y musculo
router.get('/training', validateAuth, searchTraining);
//training seleccionar por ID
router.get('/training/:idtraining', validateAuth, searchTrainingById);







export default router;