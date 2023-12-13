import { validateInt } from '../../helpers/index.js';
import { removeFavById, getFavByUser } from '../../models/favs/index.js';

// Borrar el entreno de favoritos
const removeFav = async (req, res, next) => {
  try {
    const trainingId = req.params.idtraining;
    const loggedUserId = req.auth.id;
    validateInt('trainingId no válido.', trainingId);

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
export default removeFav;
