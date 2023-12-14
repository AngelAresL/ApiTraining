import { generateError, validateInt } from '../../helpers/index.js';
import {selecAllFavorites} from '../../models/favs/index.js';
import {selecAllLikes} from '../../models/likes/index.js';
import { deleteTrainingById,selectTrainingById } from '../../models/training/index.js';

const deleteTraining = async (req, res, next) => {
  try {
    const rol = req.auth.rol;
    const trainingId = req.params.idtraining;
     // Hacemos la llamada al helper de validación del numero entero
    validateInt('trainingId no válido.', trainingId);

    // Comprobar que el usuario del token es admin.
    if (rol !== 'admin') {
       generateError(
        'No tienes permisos de administrador para borrar este entreno.',
        403
      );
    }
    //Comprobamos si el idtraining existe
    const trainingExists = await selectTrainingById(trainingId);
    if(!trainingExists){
        generateError('El entrenamiento seleccionado no existe.', 404);
      }

   //Consultamos cuantos registros de like tiene este entreno y los borramos---------------------------------
    const likes= await selecAllLikes(trainingId);
    if (!likes){
      generateError(error, error.statusCode || 500);
    }

    //Consultamos cuantos registros de like tiene este entreno y los borramos
    const favorites= await selecAllFavorites(trainingId);
    if (!favorites){
      generateError(error, error.statusCode || 500);
    }

    // Borrar el entreno
   await deleteTrainingById(trainingId);
  

    res.send({
      status: 'ok',
      message: `El entreno con id: ${trainingId} fue borrado.`,
    });
  } catch (error) {
    next(error);
  }
};

export default deleteTraining;
