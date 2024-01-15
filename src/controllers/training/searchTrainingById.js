import { selectTrainingById_2 } from '../../models/training/index.js';
import { generateError, validateInt } from '../../helpers/index.js';

const searchTrainingById = async (req, res, next) => {
  try {
    const trainingId = req.params.idtraining;
     // Hacemos la llamada al helper de validación del numero entero
    validateInt('trainingId no válido.', trainingId);

    const training = await selectTrainingById_2(trainingId);
    if (!training) {
      generateError("El entreno que buscas no existe",404)
      
    }

    res.send({ message: 'Entrenamiento seleccionado', data: training });
  } catch (error) {
    next(error);
  }
};

export default searchTrainingById;
