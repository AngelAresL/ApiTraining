import pool from '../../db/pool.js';
const deleteTrainingById = async ({ id }) => {
  await pool.query(`DELETE * FROM training WHERE id = ?`, [id]);
};

export default deleteTrainingById;
