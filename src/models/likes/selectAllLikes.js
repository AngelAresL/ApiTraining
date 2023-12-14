import pool from '../../db/pool.js';


const selecAllLikes = async (trainingId) => {
  try {
      
    const [result] = await pool.query(
      `SELECT * FROM likes WHERE id_training= ?`,
      [ trainingId]
    );
    //console.log('Este entreno tiene estos likes: ', result);

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