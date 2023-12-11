import {
  insertTraining,
  selectTrainingById,
} from '../../models/training/index.js';
import { saveImage, generateError } from '../../helpers/index.js';
import validateJoiTraining from '../../helpers/validateJoiTraining.js';

const createTraining = async (req, res, next) => {
  try {
    const loggedUserRol = req.auth.rol;
    const loggedUserId = 1;
    const crudeData = req.files;
    let photoTrainingName;
    const { name, description, typology, muscle_group } = req.body;
    //Validacion de Joi

    await validateJoiTraining({ name, description, typology, muscle_group });

    if (loggedUserRol != 'admin') {
      generateError(
        'Necesario credencial de administrador para realizar esta tarea',
        401
      );
    }
    //Comprueba si existe imagen
    if (req.files && req.files.image) {
      //llama a funcion de guaradar imagen
      photoTrainingName = await saveImage(crudeData);
    } else {
      photoTrainingName = 'defaultWoroutAvatar.jpg';
    }

    const insertNewIdTraining = await insertTraining({
      name,
      description,
      photoTrainingName,
      typology,
      muscle_group,
      loggedUserId,
    });

    const newTraining = await selectTrainingById(insertNewIdTraining);

    res.status(201).send({
      message: 'Se ha creado su entreno correctamente',
      data: newTraining,
    });
  } catch (error) {
    next(error);
  }
};

export default createTraining;
