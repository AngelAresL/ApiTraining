import express from 'express';

import {
  login,
  modifyUser,
  register,
  removeUser,
  verifyRole,
} from '../controllers/users/index.js';

import { validateAuthLink, validateAuth } from '../middlewares/index.js';
import {
  forgotPassword,
  resetPassword,
} from '../controllers/password/index.js';

const router = express.Router();

//Ruta para registrar a un usuario.
router.post('/register', register);
//Ruta para logear a un usuario.
router.post('/login', login);
//Ruta para verificar y rol
router.get('/verify', validateAuth, verifyRole);
//Ruta para solicitar nueva contraseña de usuario.
router.post('/loginForgot', forgotPassword);
//Ruta para resetear la contraseña de usuario.
router.patch('/loginReset/:temp', resetPassword);
//Ruta para borrar a un usuario.
router.delete('/removeUser/:id', validateAuth, removeUser);
//Ruta para modificar datos de un usuario
router.put('/modify', validateAuth, modifyUser);

export default router;
