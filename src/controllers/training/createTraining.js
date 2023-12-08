import path from 'path';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import {
  insertTraining,
  selectTrainingById,
} from '../../models/training/index.js';
import { generateError, createPath } from '../../helpers/index.js';
const createTraining = async (req, res, next) => {
  try {
    const loggedUserRol = req.auth.rol;
    const loggedUserId = req.auth.id;
    const { name, description, typology, muscle_group } = req.body;
    let photoTrainingName;
    if (loggedUserRol != 'admin') {
      generateError(
        'Necesario credencial de administrador para realizar esta tarea',
        401
      );
    }
    //Comprueba si existe imagen
    if (req.files && req.files.image) {
      //Ruta del directorio donde se guardaran las imagenes
      const photosDirPath = path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        './uploads'
      );
      //Se crea carpeta si no existe
      await createPath(photosDirPath);

      //Procesa imagen para poder alamcenarla
      const photoTraining = sharp(req.files.image.data);
      photoTraining.resize(500);

      //Guardo imagen despues de renombrar imagen
      const [name, ext] = req.files.image.name.split('.');
      photoTrainingName = `${uuidv4()}.${ext}`;
      await image.toFile(path.resolve(photosDirPath, photoTrainingName));
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
