

import { generateError } from '../../helpers/index.js';
import {getCountLikesByTraining} from '../../models/likes/index.js';


const searchLikesByTraining = async (req, res, next) => {
  try {
    const trainingId = req.params.idtraining;

    const training = await getCountLikesByTraining(trainingId);

    if (!training) {
      generateError('El entreno que buscas no existe', 404);
    }

    res.send({ message: 'Entrenamiento seleccionado', data: training });
  } catch (error) {
    next(error);
  }
};



export default searchLikesByTraining;