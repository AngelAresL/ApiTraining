import pool from '../../../db/pool.js';
import { generateError } from '../../../helpers/index.js';

const selectFavById = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'no implementada',
    });
  } catch (error) {
    next(error);
  }
};

export default selectFavById;
