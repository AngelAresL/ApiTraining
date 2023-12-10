import pool from '../../db/pool.js';

const insertLike = async (trainingId, loggedUserId) => {

  const [{ insertId }] = await pool.query(
    'INSERT INTO likes (trainingId, loggedUserId) VALUES (?, ?);',
    [trainingId, loggedUserId]
  );

  return insertId;
};

export default insertLike;