import express from 'express';
import morgan from "morgan";
import useDb from './src/db/useDb.js';
import { handleError, notFound, validateAuth } from './src/middlewares/index.js';
import { SERVER_PORT,SERVER_HOST } from './env.js';
import {createTraining,deleteTraining,modifyTraining} from './src/controllers/training/index.js';
import {login,register} from './src/controllers/users/index.js'

const app = express();
app.use(express.json());

//middlewares de morgan o cors
app.use(morgan('dev'));
useDb();

//Rutas
//user register
//user login
app.post("/register", register);
app.post("/login", login);

//rol general
//training seleccionar todo
//training seleccionar por ID
//dar like
//dar favs


//rol admin
//training create
 app.post("/training", validateAuth, createTraining )
//training delete
app.delete("/training",validateAuth, deleteTraining)
//training modify (put y path)
app.put("/delete",validateAuth, modifyTraining)

//middlewares de manejo de errores y pagina no encontrada

app.use(notFound);
app.use(handleError);

//levantar servidor
app.listen(SERVER_PORT, () => {
  console.log(`Server listening on ${SERVER_HOST}:${SERVER_PORT}`);
});
