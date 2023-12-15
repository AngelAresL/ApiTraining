import pool from '../../db/pool.js';

// Función para listar los likes de un entrenamiento.
const selectAllLikes = async (trainingId) => {
  try {
      
    const [result] = await pool.query(
      `SELECT * FROM likes WHERE id_training= ?`,
      [ trainingId]
    );
  

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

export default selectAllLikes;