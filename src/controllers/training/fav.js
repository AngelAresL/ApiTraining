import generateError from '../../helpers/index.js'
import addFavById from '../../models/training/index.js' 

const addFavById = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'no implementada',
    });
  } catch (error) {
    next(error);
  }
};

export default addFavById;