import Joi from 'joi';
import bcrypt from 'bcrypt';
import { insertUser, selectUserByEmail } from '../../models/users/index.js';
import generateError from '../../helpers/generateError.js';
import sendMailUtil from '../../helpers/sendMailUtil.js';

//  esquema de validación con Joi
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  rol: Joi.string().required(),
});

const register = async (req, res, next) => {
  try {
    // Valida los datos de entrada
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: 'Error en la validación de datos',
        details: error.details,
      });
    }

    // Desestructuro los datos validados
    const { name, email, password, rol } = value;

    // Compruebo si el correo electrónico ya existe
    const emailExists = await selectUserByEmail(email);

    if (emailExists) {
      return res.status(400).json({
        error: 'Ya existe un usuario con este email 😥',
      });
    }

    // Genero el hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserto el usuario en la base de datos
    const insertId = await insertUser({ name, email, hashedPassword, rol });

    // Configuro el asunto y cuerpo del correo electrónico
    const emailSubject = 'Gracias por registrarte en nuestra plataforma';
    const bodyMail = `!!!!Bienvenid@ ${name} 
                        Gracias por registrarte, pronto nos comunicaremos contigo`;

    // Envío el correo electrónico
    await sendMailUtil(email, emailSubject, bodyMail);

    // Respondo con éxito
    res.status(201).send({
      message: 'Registro completado con éxito ✌️',
      data: { id: insertId, name, email, rol },
    });
  } catch (error) {
    next(error);
  }
};

export default register;

