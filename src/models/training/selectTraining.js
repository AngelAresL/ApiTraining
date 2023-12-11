import pool from '../../db/pool.js';

const selectTraining = async ({ typology, muscle_group }) => {
  let sqlQuery = 'SELECT * FROM training';
  const sqlValues = [];
  let sqlClause = 'WHERE';

  if (typology) {
    sqlQuery += ` ${sqlClause} typology LIKE ?`;
    sqlValues.push(`%${typology}%`);
    sqlClause = 'AND';
  }

  if (muscle_group) {
    sqlQuery += ` ${sqlClause} muscle_group LIKE ?`;
    sqlValues.push(`%${muscle_group}%`);
  }

  const [training] = await pool.query(sqlQuery, sqlValues);

  return training;
};

export default selectTraining;
