import generateError from '../../helpers/generateError.js';
const login = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'no implementada',
    });
  } catch (error) {
    next(error);
  }
};

export default login;