import {
  existingData,
  generateError,
  saveImage,
  validateJoiTraining,
  validateInt,
} from '../../helpers/index.js';
import {
  selectTrainingById,
  modifyTrainingById,
} from '../../models/training/index.js';

const modifyTraining = async (req, res, next) => {
  try {
    const trainingId = req.params.idtraining;
    const crudeData = req.files;
    const { name, description, typology, muscle_group } = req.body;
    let photoTrainingName;
    const loggedUserRol = req.auth.rol;
    validateInt('trainingId no válido.', trainingId);

    await validateJoiTraining({ name, description, typology, muscle_group });

    if (loggedUserRol !== 'admin') {
      generateError(
        'Debes ser administrador para modificar entrenamientos',
        403
      );
    }

    const existingTraining = await selectTrainingById(trainingId);

    if (!existingTraining) {
      generateError('El entrenamiento no existe', 404);
    }

    existingData(
      req.body,
      existingTraining,
      'Debes cambiar algún dato del entrenamiento'
    );

    //Comprueba si existe imagen
    if (req.files && req.files.image) {
      //llama a funcion de guaradar imagen
      photoTrainingName = await saveImage(crudeData);
    } else {
      photoTrainingName = 'defaultWorkoutAvatar.jpg';
    }

    // Update de training en la base de datos
    const updatedTraining = await modifyTrainingById(
      name,
      description,
      photoTrainingName,
      typology,
      muscle_group,
      existingTraining.id_user,
      trainingId
    );

    res.status(200).json({
      message: 'Entrenamiento actualizado correctamente',
      data: updatedTraining,
    });
  } catch (error) {
    next(error);
  }
};

export default modifyTraining;
