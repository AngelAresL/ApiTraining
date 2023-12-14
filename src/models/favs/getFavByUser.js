import pool from '../../db/pool.js';
import { generateError } from '../../helpers/index.js';

const getFavByUser = async (id_user) => {
  try {
    const selectFav = await pool.query(
      'SELECT training.name, training.description, training.photo, training.typology, training.muscle_group, training.createdAt FROM favorites INNER JOIN training ON favorites.id_training = training.id WHERE favorites.id_user = ?;',
      [id_user]
    );

    return selectFav;
  } catch (error) {
    throw generateError(error, error.statusCode || 500);
  }
};

export default getFavByUser;
