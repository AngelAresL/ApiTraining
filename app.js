import express from 'express';
import { handleError, notFound } from './src/middlewares/index.js';
import { SERVER_PORT,SERVER_HOST } from './env.js';

const app = express();
app.use(express.json());

//middlewares de morgan o cors
app.use(morgan('dev'));

//Rutas
//user register
//user login

//rol general
//training seleccionar todo
//training seleccionar por ID
//dar like
//dar favs


//rol admin
//training create
//training delete
//training modify (put y path)


//middlewares de manejo de errores y pagina no encontrada

app.use(notFound);
app.use(handleError);

//levantar servidor
app.listen(SERVER_PORT, () => {
  console.log(`Server listening on ${SERVER_HOST}:${SERVER_PORT}`);
});
