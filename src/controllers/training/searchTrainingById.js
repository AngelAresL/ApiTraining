import { selectTrainingById } from '../../models/training/index.js';
import { validateInt } from '../../helpers/index.js';

const searchTrainingById = async (req, res, next) => {
  try {
    const trainingId = req.params.idtraining;
    validateInt('trainingId no válido.', trainingId);
    const training = await selectTrainingById(trainingId);

    res.send({ message: 'Entreno seleccionado', data: training });
  } catch (error) {
    next(error);
  }
};

export default searchTrainingById;
