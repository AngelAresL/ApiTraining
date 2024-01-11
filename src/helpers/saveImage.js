import path from 'path';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { createPathIfNotExist } from './index.js';
import { UPLOADS_DIR } from '../../env.js';

const saveImage = async (crudeData) => {
  try {
    //Ruta del directorio donde se guardaran las imagenes
    // const photosDirPath = path.resolve(
    //   path.dirname(fileURLToPath(import.meta.url)),
    //   '../uploads'
    // );-----------
    const photosDirPath = path.resolve(UPLOADS_DIR)
    
    //Se crea carpeta si no existe
    await createPathIfNotExist(photosDirPath);

    //Procesa imagen para poder alamcenarla
    const photoTraining = sharp(crudeData.image.data);
    photoTraining.resize(500);

    //Guardo imagen despues de renombrar imagen
    const [name, ext] = crudeData.image.name.split('.');
    const photoName = `${uuidv4()}.${ext}`;
    await photoTraining.toFile(path.resolve(photosDirPath, photoName));
    return photoName;
  } catch (error) {
    next(error);
  }
};
export default saveImage;
