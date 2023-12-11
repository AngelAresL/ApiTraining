import { generateError } from '../../helpers/index.js';
import {
  addFavById,
  removeFavById,
  selectFavById,
} from '../../models/training/index.js';

// Add a workout to favorites
const addFav = async (req, res, next) => {
  try {
    const rol = req.auth.rol;
    const trainingId = req.params.idtraining;
    const loggedUserId = req.auth.id;
    const [addFav] = await addFavById(trainingId, loggedUserId);
    const numRegex = /^\d+$/;

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

    res.status(200).json({
      message: 'Entrenamiento añadido a favoritos con éxito.',
      fav_count: addFav.insertId,
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
    const [removeFav] = await removeFavById(trainingId, loggedUserId);
    const numRegex = /^\d+$/;

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

    res.status(200).json({
      message: 'Entrenamiento borrado de favoritos con éxito.',
      fav_count: removeFav.insertId,
    });
  } catch (error) {
    next(error);
  }
};

// Favorites list
const selectFav = async (req, res, next) => {
  try {
    const rol = req.auth.rol;
    const trainingId = req.params.idtraining;
    const loggedUserId = req.auth.id;
    const [selectFav] = await selectFavById(trainingId, loggedUserId);
    const numRegex = /^\d+$/;

    if (!numRegex.test(trainingId)) {
      throw generateError('trainingId no válido.', 404);
    }

    // Comprobar que el usuario del token es admin.
    if (rol !== 'normal') {
      throw generateError(
        'Los administradores no pueden listar sus favoritos.',
        401
      );
    }

    res.status(200).json({
      message: 'Listado de favoritos.',
      fav_count: selectFav,
    });
    console.log(selectFav);
  } catch (error) {
    next(error);
  }
};
export { addFav, removeFav, selectFav };
