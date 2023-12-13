import express from 'express';
import { validateAuth } from '../middlewares/index.js';
import { addFav, getFav, removeFav } from '../controllers/fav/index.js';

const router = express.Router();

//dar favs
router.post('/fav/:idtraining', validateAuth, addFav);
//quitar favs
router.delete('/fav/:idtraining', validateAuth, removeFav);

//listar todos los favs
router.get('/fav', validateAuth, getFav);

export default router;
