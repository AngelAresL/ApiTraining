import generateError from '../../helpers/generateError.js';
import {
  selectTrainingById,
  deleteTrainingById,
} from '../../models/training/index.js';

const deleteTraining = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Conseguir la información del entreno
    const training = await selectTrainingById(id);

    // Comprobar que el usuario del token es admin, se podría hacer comparando con quien lo creó con  req.userId !== training.user_id
    if (req.rol !== 'admin') {
      throw generateError(
        'No tienes permisos de administrador para borrar este entreno.',
        401
      );
    }

    // Borrar el entreno
    await deleteTrainingById(id);

    res.send({
      status: 'ok',
      message: `El entreno con id: ${id} fue borrado`,
    });
  } catch (error) {
    next(error);
  }
};

export default deleteTraining;
