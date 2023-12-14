import { selectTrainingById } from '../../models/training/index.js';
import { validateInt } from '../../helpers/index.js';

const searchTrainingById = async (req, res, next) => {
  try {
    const trainingId = req.params.idtraining;
     // Hacemos la llamada al helper de validación del numero entero
    validateInt('trainingId no válido.', trainingId);
    const training = await selectTrainingById(trainingId);

    res.send({ message: 'Entrenamiento seleccionado', data: training });
  } catch (error) {
    next(error);
  }
};

export default searchTrainingById;
