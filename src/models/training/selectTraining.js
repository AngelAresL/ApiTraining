import pool from '../../db/pool.js';
// Función para listar todos los entrenamientos, podemos además filtrar por tipologia, grupo muscular y ordenar por fecha o nombre  con query strings
const selectTraining = async ({ typology, name, muscle_group, createdAt }) => {
  let sqlQuery = 'SELECT name, description, photo, typology, muscle_group, createdAt FROM training';
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
  
  //--------------------------------------------------------------------------------
if (name) {
  sqlQuery += `  ORDER BY name`;

}

if (createdAt) {
  sqlQuery += `  ORDER BY createdAt DESC`;

}

//--------------------------------------------------------------------------------
  const [training] = await pool.query(sqlQuery, sqlValues);

  return training;
};

export default selectTraining;
