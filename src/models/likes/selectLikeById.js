import pool from '../../db/pool.js';

const selectLikeById = async (likeId) => {

  const [result] = await pool.query(
    'SELECT * FROM likes WHERE id = ?;',
    [likeId]
  );

  return result;
};

export default selectLikeById;
