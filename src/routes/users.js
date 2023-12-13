import express from 'express';

import {login,register} from '../controllers/users/index.js';
import {validateAuth} from '../middlewares/index.js';
import {forgotPassword,  resetPassword } from '../controllers/password/index.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
//olvido de password
router.post('/loginForgot', forgotPassword);
router.patch('/loginReset', validateAuth, resetPassword);

export default router;