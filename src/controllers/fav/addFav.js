import { validateInt } from '../../helpers/index.js';
import { addFavById, getFavByUser } from '../../models/favs/index.js';

// Añadir un entreno a favoritos
const addFav = async (req, res, next) => {
  try {
    const trainingId = req.params.idtraining;
    const loggedUserId = req.auth.id;
    // Hacemos la llamada al helper de validación del numero entero
    validateInt('trainingId no válido.', trainingId);
    // Llamamos al model para añadir a favoritos
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

export default addFav;
