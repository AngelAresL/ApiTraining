import pool from '../../../db/pool.js';
import { generateError } from '../../../helpers/index.js';

const removeFavById = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'no implementada',
    });
  } catch (error) {
    next(error);
  }
};

export default removeFavById;
