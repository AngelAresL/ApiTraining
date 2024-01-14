import { generateError, validateInt } from '../../helpers/index.js';
import { selectUserById, removeUserById } from '../../models/users/index.js';
import {
  selectTrainingByIdUser,
  updateIdUserTraining,
} from '../../models/training/index.js';

// Borrar el entreno de favoritos
const removeUser = async (req, res, next) => {
  try {
    // const loggedUserRol = req.auth.rol;

    const loggedUserId = req.auth.id;
    const userTarget = parseInt(req.params.id);

    // Hacemos la llamada al helper de validación del numero entero
    validateInt('Usuario no válido', userTarget);

    const userExists = await selectUserById(userTarget);
    // Comprobamos que el usuario exista
    if (!userExists) {
      generateError('El usuario seleccionado no existe.', 404);
    }
    // Nos aseguramos de que el user no sea el 1, que es el trainerDefault creado en initDb
    // if (userTarget == 1) {
    //   generateError('Ese usuario no puede ser eliminado.', 403);
    // }
    //Revisar para implantar el nuevo middleware isAdmin-------------
    // // Comprobamos que el usuario del token es admin.
    // if (loggedUserRol === 'admin') {
    //   //Comprobamos si existen entranamientos creados con el id del usuario a borrar
    //   const trainingCreateForUser = await selectTrainingByIdUser(userTarget);

    //   if (trainingCreateForUser) {
    //     //Actualizamos los entrenamientos creados por el ususario a eliminar indicado id_user por defecto
    //     await updateIdUserTraining(userTarget);
    //     // Llamamos al model para borrar usuario
    //     await removeUserById(userTarget);
    //   }
    // } else {
    //   //Comprobamos que el usuario que borra sea el mismo que el que intenta borrar
    //   if (loggedUserId != userTarget) {
    //     generateError(
    //       'No tienes permisos de administrador para borrar usuarios ajenos.',
    //       403
    //     );
    //   } else {
    //     // Llamamos al model para borrar usuario
    //     await removeUserById(userTarget);
    //   }
    // }
    const userExists2 = await selectUserById(loggedUserId)

    if (loggedUserId != userTarget && userExists2.rol === 'normal') {
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
