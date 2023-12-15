import express from 'express';
import {validateAuth} from '../middlewares/index.js';
import {createTraining, deleteTraining, modifyTraining, searchTraining, searchTrainingById} from '../controllers/training/index.js';



const router = express.Router();

//Ruta para crear un entrenamiento.
router.post('/training', validateAuth, createTraining);
//Rutas para borrar un entrenamiento.
router.delete("/training", validateAuth, deleteTraining)
router.delete('/training/:idtraining', validateAuth, deleteTraining);
//Ruta para modifcar un entrenamiento.
router.put('/training/:idtraining', validateAuth, modifyTraining);
//Ruta para ordenar y filtrar entrenamientos.
router.get('/training', searchTraining);                       
//Ruta para seleccionar un entrenamiento.
router.get('/training/:idtraining', searchTrainingById);              

export default router;