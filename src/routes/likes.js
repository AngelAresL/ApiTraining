import express from 'express';
import { validateAuth } from '../middlewares/index.js';
import { addLike, deleteLike } from '../controllers/likes/index.js';


const router = express.Router();

//Ruta para dar like
router.post('/like/:idtraining', validateAuth, addLike);
//Ruta para eliminar like
router.delete('/like/:idtraining', validateAuth, deleteLike);


export default router;
