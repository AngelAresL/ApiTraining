import { generateError } from '../../helpers/index.js';
import {
  addFavById,
  removeFavById,
  getFavByUser,
} from '../../models/favs/index,.js';

// Añadir un entreno a favoritos
const addFav = async (req, res, next) => {
  try {
    const trainingId = req.params.idtraining;
    const loggedUserId = req.auth.id;

    const numRegex = /^\d+$/;

    if (!numRegex.test(trainingId)) {
      throw generateError('trainingId no válido.', 404);
    }

    await addFavById(loggedUserId, trainingId);
    const [fav] = await getFavByUser(loggedUserId);

    res.status(200).json({
      message: 'Entrenamiento añadido a favoritos con éxito.',
      fav_list: fav,
    });
  } catch (error) {
    next(error);
  }
};

// Borrar el entreno de favoritos
const removeFav = async (req, res, next) => {
  try {
    const trainingId = req.params.idtraining;
    const loggedUserId = req.auth.id;
    const numRegex = /^\d+$/;

    if (!numRegex.test(trainingId)) {
      throw generateError('trainingId no válido.', 404);
    }

    await removeFavById(loggedUserId, trainingId);
    const [fav] = await getFavByUser(loggedUserId);

    res.status(200).json({
      message: 'Entrenamiento borrado de favoritos con éxito.',
      fav_list: fav,
    });
  } catch (error) {
    next(error);
  }
};

// Lista de favoritos
const getFav = async (req, res, next) => {
  try {
    const loggedUserId = req.auth.id;
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
