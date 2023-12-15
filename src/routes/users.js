import express from 'express';

import {login,register} from '../controllers/users/index.js';
import {validateAuthLink} from '../middlewares/index.js';
import {forgotPassword,  resetPassword } from '../controllers/password/index.js';

const router = express.Router();

//Ruta para registrar a un usuario.
router.post('/register', register);
//Ruta para logear a un usuario.
router.post('/login', login);
//Ruta para solicitar nueva contraseña de usuario.
router.post('/loginForgot', forgotPassword);
//Ruta para resetear la contraseña de usuario.
router.patch('/loginReset/:token', validateAuthLink, resetPassword);

export default router;