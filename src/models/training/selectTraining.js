import pool from '../../db/pool.js';

const selectTraining = async ({ name, typology, muscle_group, order_by, offset, pageSize }) => {
  let sqlQuery = `SELECT count(l.id_training) AS allLikes,t.id,  t.name, t.description, t.photo, t.typology, t.muscle_group, t.created_at 
  FROM training t
  LEFT JOIN likes l ON l.id_training = t.id `;

  const sqlValues = [];
  let sqlClause = ' WHERE';

  if (name) {
    sqlQuery += `${sqlClause} name LIKE ?`;
    sqlValues.push(`%${name}%`);
    sqlClause = 'AND';
  }

  if (typology) {
    sqlQuery += `${sqlClause} typology LIKE ?`;
    sqlValues.push(`%${typology}%`);
    sqlClause = 'AND';
  }

  if (muscle_group) {
    sqlQuery += `${sqlClause} muscle_group LIKE ?`;
    sqlValues.push(`%${muscle_group}%`);
  }

  sqlQuery += `GROUP BY (t.id)`;
  //--------------------------------------------------------------------------------
  if (order_by === 'name') {
    sqlQuery += `ORDER BY t.name`;
  }

  if (order_by === 'date') {
    sqlQuery += `ORDER BY t.created_at DESC`;
  }
  if (order_by === 'likes') {
    sqlQuery += `ORDER BY allLikes DESC`;
  }
  //--------------------------------------------------------------------------------

  sqlQuery += ` LIMIT ? OFFSET ?`;
  sqlValues.push(parseInt(pageSize, 10), parseInt(offset, 10));
  const [training] = await pool.query(sqlQuery, sqlValues);

  return training;
};

export default selectTraining;
