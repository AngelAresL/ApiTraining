import pool from '../../db/pool.js';
import {selectTrainingById} from '../training/index.js';

const selecAllLikes = async (trainingId) => {
  try {
    //Comprobamos si el idtraining existe
    const trainingExists = await selectTrainingById(trainingId);    
    if(!trainingExists){
        generateError('El entrenamiento seleccionado no existe', 400);
    }else{
        console.log(`El entreno ${trainingExists} existe`);
    }
    
    const [result] = await pool.query(
      'SELECT * FROM likes WHERE id_training= ?;',
      [ trainingId]
    );
    console.log('Este entreno tiene estos likes: ', result);

    
    for(let item of result){
        await pool.query(
            `DELETE FROM likes WHERE id= ?`,
            [ item.id]
          );
    }

    return result;
  } catch {
    return 0;
  }
};

export default selecAllLikes;