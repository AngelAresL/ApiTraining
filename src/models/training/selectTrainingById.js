import pool from '../../db/pool.js';

const selectTrainingById = async (id) => {
  const [[training]] = await pool.query(
    'SELECT * FROM training WHERE id = ?;',
    [id]
  );

  return training;
};

export default selectTrainingById;
