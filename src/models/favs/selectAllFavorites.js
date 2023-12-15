import pool from '../../db/pool.js';
// Función para seleccionar todos los favoritos.
const selectAllFavorites = async (trainingId) => {
  try {
    
    const [result] = await pool.query(
      `SELECT * FROM favorites WHERE id_training= ?`,
      [ trainingId]
    );
    console.log('Este entreno tiene estos likes: ', result);

    
    for(let item of result){
        await pool.query(
            `DELETE FROM favorites WHERE id= ?`,
            [ item.id]
          );
    }

    return result;
  } catch {
    return 0;
  }
};

export default selectAllFavorites;