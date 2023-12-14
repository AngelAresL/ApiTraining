import { generateError, validateInt } from '../../helpers/index.js';
import {selecAllFavorites} from '../../models/favs/index.js';
import {selecAllLikes} from '../../models/likes/index.js';
import { deleteTrainingById,selectTrainingById } from '../../models/training/index.js';

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
    //Comprobamos si el idtraining existe
    const trainingExists = await selectTrainingById(trainingId);
    if(!trainingExists){
        generateError('El entrenamiento seleccionado no existe', 400);
      }

   //Consultamos cuantos registros de like tiene este entreno y los borramos---------------------------------
    const likes= await selecAllLikes(trainingId);
    if (!likes){
      generateError('Ha ocurrido un error borrando likes de este entreno', 404);
    }

    //Consultamos cuantos registros de like tiene este entreno y los borramos
    const favorites= await selecAllFavorites(trainingId);
    if (!favorites){
      generateError('Ha ocurrido un error borrando favoritos de este entreno', 404);
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
