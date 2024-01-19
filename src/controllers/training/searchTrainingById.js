import { selectTrainingByIdAllLikes } from '../../models/training/index.js';

import { generateError } from '../../helpers/index.js';

const searchTrainingById = async (req, res, next) => {
  try {
    const loggedId = req.auth.id;

    const training = await selectTrainingByIdAllLikes(loggedId);

    if (!training) {
      generateError('El entreno que buscas no existe', 404);
    }

    res.send({ message: 'Entrenamiento seleccionado', data: training });
  } catch (error) {
    next(error);
  }
};

export default searchTrainingById;
