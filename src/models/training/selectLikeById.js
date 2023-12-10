import pool from '../../db/pool.js';

const selectLikeById = async (id) => {

  const [like] = await pool.query(
    'SELECT * FROM likes WHERE id = ?;',
    [id]
  );

  return like;
};

export default selectLikeById;
