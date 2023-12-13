import { generateError, validateInt } from '../../helpers/index.js';
import {
  insertLike,
  selectLike,
  selectLikeById,
} from '../../models/likes/index.js';
import { selectTrainingById } from '../../models/training/index.js';

const addLike = async (req, res, next) => {
  try {
    //Cogemos el id de entrenamiento que se para por parametro
    const trainingId = req.params.idtraining;
    //Cogemos el id del payload de usuario logeado
    const loggedUserId = req.auth.id;
    validateInt('trainingId no válido.', trainingId);

    //Comprobamos si el idtraining existe
    const trainingExists = await selectTrainingById(trainingId);
    if (!trainingExists) {
      generateError('El entrenamiento seleccionado no existe', 400);
    }

    //Comprobamos si el usuario ya dio like a un entrenamiento
    const repeatedLike = await selectLike(loggedUserId, trainingId);
    if (repeatedLike) {
      generateError('Este usuario ya dio like a este ejercicio', 400);
    }

    //Insertamos id de usuario logeado e id de training en la tabla likes
    const likeId = await insertLike(trainingId, loggedUserId);

    if (!likeId) {
      generateError('Ha ocurrido un error dando like', 400);
    }
    //Comprobamos que se añadió el like a la tabla
    const [result] = await selectLikeById(likeId);
    if (!result) {
      generateError('Ha ocurrido un error consultando el likeId', 400);
    }

    res.status(201).send({
      message: 'Añadido like correctamente',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default addLike;
