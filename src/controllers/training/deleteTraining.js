import generateError from '../../helpers/generateError.js';
import {selecAllLikes} from '../../models/likes/index.js'
import { deleteTrainingById } from '../../models/training/index.js';

const deleteTraining = async (req, res, next) => {
  try {
    const rol = req.auth.rol;
    const trainingId = req.params.idtraining;
    const numRegex = /^\d+$/;

    if (!numRegex.test(trainingId)) {
      throw generateError('trainingId no válido', 404);
    }

    // Comprobar que el usuario del token es admin.
    if (rol !== 'admin') {
      throw generateError(
        'No tienes permisos de administrador para borrar este entreno.',
        401
      );
    }

       //Consultamos cuantos registros de like tiene este entreno y los eliminamos ---------------
       const likes= await selecAllLikes(trainingId);
       if (!likes){
         generateError('Ha ocurrido un error borrando likes de este entreno', 404);
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
