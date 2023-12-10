import pool from '../../db/pool.js';

const insertLike = async (trainingId, loggedUserId) => {

  const [{ insertId }] = await pool.query(
    'INSERT INTO likes ( id_training, id_user) VALUES (?, ?);',
    [trainingId, loggedUserId]
  );

  return insertId;
};

export default insertLike;