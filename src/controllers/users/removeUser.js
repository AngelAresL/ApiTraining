import { generateError, validateInt } from '../../helpers/index.js';
import { selectUserById, removeUserById } from '../../models/users/index.js';

// Borrar el entreno de favoritos
const removeUser = async (req, res, next) => {
  try {
    const loggedUserId = req.auth.id;
    const userTarget = parseInt(req.params.id);

    // Hacemos la llamada al helper de validación del numero entero
    validateInt('Usuario no válido', userTarget);

    const userExists = await selectUserById(userTarget);
    // Comprobamos que el usuario exista
    if (!userExists) {
      generateError('El usuario seleccionado no existe.', 404);
    }

    const userLoggedDeleting = await selectUserById(loggedUserId);

    if (loggedUserId != userTarget && userLoggedDeleting.rol === 'normal') {
      generateError(
        'No tienes permisos de administrador para borrar usuarios ajenos.',
        403
      );
    } else {
      // Llamamos al model para borrar usuario
      await removeUserById(userTarget);
    }

    res.status(200).json({
      message: 'Usuario borrado con éxito.',
    });
  } catch (error) {
    next(error);
  }
};
export default removeUser;
