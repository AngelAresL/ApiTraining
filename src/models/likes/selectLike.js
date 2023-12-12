import pool from '../../db/pool.js';

const selectLike = async (loggedUserId, trainingId) => {
  try {
    const [[result]] = await pool.query(
      'SELECT * FROM likes WHERE id_user= ? AND id_training= ?;',
      [loggedUserId, trainingId]
    );
    console.log('El id del like es: ', result.id);
    return result.id;
  } catch {
    return 0;
  }
};

export default selectLike;
