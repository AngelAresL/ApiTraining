import express from 'express';
import { sortNumberLikes } from '../controllers/sortTraining/index.js';


const router = express.Router();

////Ruta para dar ordenar los entrennmientos por numero de likes.
router.get('/sortLikes', sortNumberLikes);

export default router;

