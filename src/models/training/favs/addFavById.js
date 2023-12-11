import pool from '../../../db/pool.js';
import { generateError } from '../../../helpers/index.js';

const addFavById = async (id_user, id_training) => {
  try {
    const fav = await pool.query(
      'INSERT INTO favorites ( id_training, id_user) VALUES (?, ?);',
      [id_user, id_training]
    );

    return fav;
  } catch (error) {
    throw generateError('Error interno del servidor', 500);
  }
};

export default addFavById;
