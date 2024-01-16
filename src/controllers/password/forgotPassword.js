import {
  deleteTemporaryPassword,
  selectUserByEmail,
  temporaryPassword,
} from '../../models/users/index.js';
import { generateError, sendMailUtil } from '../../helpers/index.js';
import { SERVER_HOST, SERVER_PORT, TOKEN_SECRET } from '../../../env.js';
import { v4 as uuidv4 } from 'uuid';

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    //Seleccionamos el usuario  por el email
    const userDb = await selectUserByEmail(email);
    if (!userDb) {
      generateError('Los datos no son correctos.', 401);
    }

    // //Creamos el Payload con el id y se el TOKEN
    // const payload = {
    //   id: userDb.id,
    // };
    // const token = jwt.sign(payload, TOKEN_SECRET, {
    //   expiresIn: '10m',
    // });
    const temporaryPass = uuidv4();

    await deleteTemporaryPassword(userDb.id);
    const gg = await temporaryPassword(temporaryPass, userDb.id);

    console.log(gg);

    // Configuro el asunto y cuerpo del correo electrónico
    const emailSubject = 'Enlace para recuperacion de contraseña.';
    const bodyMail = `Acceda al enlace siguiente para reiniciar su contraseña: http://${SERVER_HOST}:${SERVER_PORT}/loginReset/${temporaryPass}`;

    // Envío el correo electrónico
    await sendMailUtil(email, emailSubject, bodyMail);

    // //Enviamos mensaje para recuperación
    res.send({
      message:
        'Le Hemos enviado un enlace a su mail para restablecer la contraseña.',
      data: temporaryPass,
    });
  } catch (error) {
    next(error);
  }
};

export default forgotPassword;
