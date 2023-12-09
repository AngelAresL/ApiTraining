import Joi from 'joi';
import {
  insertTraining,
  selectTrainingById,
} from '../../models/training/index.js';
import { saveImage, generateError } from '../../helpers/index.js';

const createTraining = async (req, res, next) => {
  try {
    const loggedUserRol = req.auth.rol;
    const loggedUserId = req.auth.id;
    const crudeData = req.files;
    let photoTrainingName;
    const { name, description, typology, muscle_group } = req.body;
    //Validacion de Joi
    const schema = Joi.object().keys({
      name: Joi.string().max(50).required(),
      description: Joi.string().max(200).required(),
      typology: Joi.string().max(50).required(),
      muscle_group: Joi.string().max(50).required(),
    });
    const validation = schema.validate({
      name,
      description,
      typology,
      muscle_group,
    });
    if (validation.error) {
      generateError(validation.error.message, 400);
    }

    if (loggedUserRol != 'admin') {
      generateError(
        'Necesario credencial de administrador para realizar esta tarea',
        401
      );
    }
    //Comprueba si existe imagen
    if (req.files && req.files.image) {
      console.log('si entra');
      //llama a funcion de guaradar imagen
      photoTrainingName = await saveImage(crudeData);
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
      data: newTraining,
    });
  } catch (error) {
    next(error);
  }
};

export default createTraining;
