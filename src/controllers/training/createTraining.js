import {
  insertTraining,
  selectTrainingById,
  selectExistingTraining,
} from '../../models/training/index.js';
import {
  saveImage,
  generateError,
  validateJoiTraining,
} from '../../helpers/index.js';

const createTraining = async (req, res, next) => {
  try {
    // const loggedUserRol = req.auth.rol;
    //Teniamos hardcodeado el id
    const loggedUserId = null;
    const crudeData = req.files;
    let photoTrainingName;
    const { name, description, typology, muscle_group } = req.body;

    //Validacion de Joi
    await validateJoiTraining({ name, description, typology, muscle_group });

    //Ahora se usa el midlleware isAdmin para chekear-----------

    // if (loggedUserRol != 'admin') {
    //   generateError(
    //     'Necesario credencial de administrador para realizar esta tarea.',
    //     401
    //   );
    // }
    //Comprueba si el usuario adjunta imagen
    if (req.files && req.files.image) {
      //llama a funcion de guaradar imagen
      photoTrainingName = await saveImage(crudeData);
    } else {
      photoTrainingName = 'defaultAvatar.jpg';
    }
    const trainingId = await selectExistingTraining(
      name,
      description,
      typology,
      muscle_group
    );

    if (trainingId) {
      generateError('El entrenamiento que intentas crear ya existe.', 409);
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
      message: 'Se ha creado su entreno correctamente.',
      data: newTraining,
    });
  } catch (error) {
    next(error);
  }
};

export default createTraining;
