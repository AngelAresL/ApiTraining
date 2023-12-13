import { generateError, validateInt } from '../../helpers/index.js';
import { deleteTrainingById } from '../../models/training/index.js';

const deleteTraining = async (req, res, next) => {
  try {
    const rol = req.auth.rol;
    const trainingId = req.params.idtraining;
    validateInt('trainingId no válido.', trainingId);

    // Comprobar que el usuario del token es admin.
    if (rol !== 'admin') {
      throw generateError(
        'No tienes permisos de administrador para borrar este entreno.',
        401
      );
    }

    // Borrar el entreno
    const train = await deleteTrainingById(trainingId);
    console.log(train);

    res.send({
      status: 'ok',
      message: `El entreno con id: ${trainingId} fue borrado`,
    });
  } catch (error) {
    next(error);
  }
};

export default deleteTraining;
