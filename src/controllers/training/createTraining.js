import {
  insertTraining,
  selectTrainingById,
} from '../../models/training/index.js';
import { saveImage } from '../../helpers/index.js';

const createTraining = async (req, res, next) => {
  try {
    // const loggedUserRol = req.auth.rol;
    const loggedUserId = 1;
    const { name, description, typology, muscle_group } = req.body;
    const crudeData = req.files;

    let photoTrainingName;
    // if (loggedUserRol != 'admin') {
    //   generateError(
    //     'Necesario credencial de administrador para realizar esta tarea',
    //     401
    //   );
    // }
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
