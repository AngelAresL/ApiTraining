import express from 'express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import useDb from './src/db/useDb.js';
import {
  handleError,
  notFound,
  validateAuth,
} from './src/middlewares/index.js';
import { SERVER_PORT, SERVER_HOST } from './env.js';
import {
  createTraining,
  deleteTraining,
  modifyTraining,
} from './src/controllers/training/index.js';
import { login, register } from './src/controllers/users/index.js';

const app = express();
app.use(express.json());

//middleware de fileupolad
app.use(fileUpload());

//middlewares de morgan o cors
app.use(morgan('dev'));
useDb();

//Rutas
//user register
//user login
app.post('/register', register);
app.post('/login', login);

//rol general
//training seleccionar todo
//training seleccionar por ID
//dar like
app.post('/like/:idtraining', addLike);
//dar favs

//rol admin
//training create
app.post('/training', validateAuth, createTraining);
//training delete
// app.delete("/training", validateAuth, deleteTraining)
app.delete('/training/:idtraining', validateAuth, deleteTraining);
//training modify (put y path)
app.put('/training', validateAuth, modifyTraining);

//middlewares de manejo de errores y pagina no encontrada

app.use(notFound);

app.use(handleError);

//levantar servidor
app.listen(SERVER_PORT, () => {
  console.log(`Server listening on ${SERVER_HOST}:${SERVER_PORT}`);
});
