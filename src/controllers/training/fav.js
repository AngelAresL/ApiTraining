import { generateError } from '../../helpers/index.js';
import {
  addFavById,
  removeFavById,
  getFavByUser,
} from '../../models/training/index.js';

// Add a workout to favorites
const addFav = async (req, res, next) => {
  try {
    const rol = req.auth.rol;
    const trainingId = req.params.idtraining;
    const loggedUserId = req.auth.id;

    const numRegex = /^\d+$/;
    // const [existingFav] = await getFavByUser(trainingId, loggedUserId);

    // if (existingFav.length > 0) {
    //   throw generateError('Este ejercicio ya está en favoritos', 400);
    // }

    if (!numRegex.test(trainingId)) {
      throw generateError('trainingId no válido.', 404);
    }

    // Comprobar que el usuario del token es admin.
    if (rol !== 'normal') {
      throw generateError(
        'Los administradores no pueden añadir a favoritos los entrenos.',
        401
      );
    }
    await addFavById(trainingId, loggedUserId);
    const fav = await getFavByUser(loggedUserId);

    res.status(200).json({
      message: 'Entrenamiento añadido a favoritos con éxito.',
      fav_list: fav[0],
    });
  } catch (error) {
    next(error);
  }
};

// Remove a workout from favorites
const removeFav = async (req, res, next) => {
  try {
    const rol = req.auth.rol;
    const trainingId = req.params.idtraining;
    const loggedUserId = req.auth.id;
    const numRegex = /^\d+$/;
    // const [existingFav] = await getFavByUser(trainingId, loggedUserId);
    // if (existingFav.length === 0) {
    //   throw generateError('Este ejercicio no está en favoritos', 400);
    // }

    if (!numRegex.test(trainingId)) {
      throw generateError('trainingId no válido.', 404);
    }

    // Comprobar que el usuario del token es admin.
    if (rol !== 'normal') {
      throw generateError(
        'Los administradores no pueden borrar de favoritos los entrenos.',
        401
      );
    }
    await removeFavById(trainingId, loggedUserId);
    const fav = await getFavByUser(loggedUserId);

    res.status(200).json({
      message: 'Entrenamiento borrado de favoritos con éxito.',
      fav_list: fav[0],
    });
  } catch (error) {
    next(error);
  }
};

// Favorites list
const getFav = async (req, res, next) => {
  try {
    const rol = req.auth.rol;
    const loggedUserId = req.auth.id;

    // Comprobar que el usuario del token es admin.
    if (rol !== 'normal') {
      throw generateError(
        'Los administradores no pueden listar sus favoritos.',
        401
      );
    }
    const [getFav] = await getFavByUser(loggedUserId);

    res.status(200).json({
      message: 'Listado de favoritos.',
      fav_list: getFav,
    });
  } catch (error) {
    next(error);
  }
};
export { addFav, removeFav, getFav };
