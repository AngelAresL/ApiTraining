import generateError from '../../helpers/generateError.js';
import pool from '../../db/pool.js';
import { selectTrainingById } from '../../models/training/index.js';
import modifyTrainingById from '../../models/training/modifyTrainingById.js';

const modifyTraining = async (req, res, next) => {
  try {
    const trainingId = req.params.idtraining;
    const { name, description, photo, typology, muscle_group, id_user } =
      req.body;

    const rolUser = req.auth.rol;

    if (rolUser !== 'admin') {
      generateError(
        'Debes ser administrador para modificar entrenamientos',
        403
      );
    }

    const existingTraining = await selectTrainingById(trainingId);

    if (!existingTraining) {
      generateError('El entrenamiento no existe', 404);
    }

    const {
      name: existingName,
      description: existingDescription,
      photo: existingPhoto,
      typology: existingTypology,
      muscle_group: existingMuscleGroup,
      id_user: existingUserId,
    } = existingTraining;

    // Update de training en la base de datos
    const updatedTraining = await modifyTrainingById(
      name,
      description,
      photo,
      typology,
      muscle_group,
      id_user,
      trainingId
    );
    // if (updatedTraining.changedRows === 0) {
    //   generateError('Hubo un problema al actualizar el entrenamiento', 500);
    // }

    const updateChanges = await selectTrainingById(trainingId);
    const hasChanged =
      updateChanges.name !== existingTraining.name ||
      updateChanges.description !== existingTraining.description ||
      updateChanges.photo !== existingTraining.photo ||
      updateChanges.typology !== existingTraining.typology ||
      updateChanges.muscle_group !== existingTraining.muscle_group ||
      updateChanges.id_user !== existingTraining.id_user;

    
    console.log(updateChanges, existingTraining);

    if (!hasChanged) {
      generateError('Debes cambiar algún dato del entrenamiento', 400);
    }

    res.status(200).json({
      message: 'Entrenamiento actualizado correctamente',
      data: updatedTraining,
    });
  } catch (error) {
    next(error);
  }
};

export default modifyTraining;
