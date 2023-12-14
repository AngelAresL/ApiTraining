import {
  selectUserById,
  modifyPasswordUser,
} from '../../models/users/index.js';
import bcrypt from 'bcrypt';

const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const loggedUserId = req.auth.id;
    //Seleccionamos el usuario por id
    const userDb = await selectUserById(loggedUserId);
    if (!userDb) {
      generateError('Los datos no son correctos.', 401);
    }

    // Genero el hash de la nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserto el usuario en la base de datos
    await modifyPasswordUser(hashedPassword, loggedUserId);

    //Enviamos mensaje si todo ha ido bien
    res.send({ message: 'Contraseña modificada correctamente.' });
  } catch (error) {
    next(error);
  }
};

export default resetPassword;
