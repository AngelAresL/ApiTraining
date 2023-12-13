import express from 'express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import useDb from './src/db/useDb.js';
import {
  handleError,
  notFound,
 
} from './src/middlewares/index.js';
import { SERVER_PORT, SERVER_HOST } from './env.js';

import {userRoutes, trainingRoutes, likeRoutes, favRoutes} from './src/routes/index.js'

const app = express();
app.use(express.json());

//middleware de fileupolad
app.use(fileUpload());

//middlewares de morgan o cors
app.use(morgan('dev'));
useDb();

//Rutas

app.use(userRoutes);
app.use(trainingRoutes);
app.use(likeRoutes);
app.use(favRoutes);


//middlewares de manejo de errores y pagina no encontrada

app.use(notFound);

app.use(handleError);

//levantar servidor
app.listen(SERVER_PORT, () => {
  console.log(`Server listening on ${SERVER_HOST}:${SERVER_PORT}`);
});
