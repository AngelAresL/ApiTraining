import { getFavByUser } from '../../models/favs/index.js';
// Lista de favoritos
const getFav = async (req, res, next) => {
  try {
    const loggedUserId = req.auth.id;
    // Llamamos al model para listar favoritos
    const [getFav] = await getFavByUser(loggedUserId);

    res.status(200).json({
      message: 'Listado de favoritos.',
      fav_list: getFav,
    });
  } catch (error) {
    next(error);
  }
};
export default getFav;
