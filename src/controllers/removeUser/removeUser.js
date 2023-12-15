import { generateError, validateInt } from '../../helpers/index.js';
import { selectUserById } from '../../models/users/index.js';
import removeUserById from '../../models/removeUser/index.js';

// Borrar el entreno de favoritos
const removeUser = async (req, res, next) => {
  try {
    const loggedUserRol = req.auth.rol;
    console.log(loggedUserRol);
    const loggedUserId = req.auth.id;
    const userTarget = req.params.id;
    // Hacemos la llamada al helper de validación del numero entero
    validateInt('Usuario no válido', userTarget);
    const userExists = await selectUserById(userTarget);
    // Comprobamos que el usuario exista
    if (!userExists) {
      generateError('El usuario seleccionado no existe.', 404);
    }
    // Comprobamos que el usuario del token es admin.
    if (loggedUserRol === 'admin') {
      // Llamamos al model para borrar usuario
      await removeUserById(userTarget);
    }
    // Comprobamos que el usuario que borra sea el mismo que el que intenta borrar
    else if (loggedUserId == userTarget) {
      await removeUserById(loggedUserId);
    } else {
      generateError(
        'No tienes permisos de administrador para borrar usuarios.',
        403
      );
    }

    res.status(200).json({
      message: 'Usuario borrado con éxito.',
    });
  } catch (error) {
    next(error);
  }
};
export default removeUser;
