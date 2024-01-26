import { generateError } from '../../helpers/index.js';
import { modifyUserById, selectUserById } from '../../models/users/index.js';
import Joi from 'joi';
import bcrypt from 'bcrypt';

// Borrar el entreno de favoritos
const modifyUser = async (req, res, next) => {
  try {
    const loggedUserId = req.auth.id;

    //Validamos los datos de entrada con Joi
    const { value } = schema.validate(req.body);
    let { name, email, password } = value;

    // Genero el hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Llamamos al model para modificar usuario
    const userModified = await modifyUserById(
      loggedUserId,
      name,
      email,
      hashedPassword      
    );
    if (!userModified) {
      generateError('Error al actualizar los datos de usuario.', 400);
    }

    const user = await selectUserById(loggedUserId); 
    console.log("Datos modificados", user);

    res.status(200).json({
      message: 'Usuario modificado con éxito.',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        rol: user.rol,
        modify_at: user.modify_at
      },
    });
  } catch (error) {
    next(error);
  }
};

//  esquema de validación con Joi
const schema = Joi.object({
  name: Joi.string()
    .required()
    .error(() => {
      generateError('El nombre es un campo obligatorio', 400);
    }),
  email: Joi.string()
    .email()
    .required()
    .error(() => {
      generateError(
        'El email es un campo obligatorio y debe ser una dirección de correo válida',
        400
      );
    }),
  password: Joi.string()
    .required()
    .error(() => {
      generateError('El password es un campo obligatorio', 400);
    }),
});

export default modifyUser;
