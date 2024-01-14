import pool from '../../db/pool.js';
// // Función para listar todos los entrenamientos, podemos además filtrar por tipologia, grupo muscular y ordenar por fecha o nombre  con query strings
// const selectTraining = async ({ typology, order_by, muscle_group }) => {
//   let sqlQuery = `SELECT COUNT(*) AS likes, t.name, t.description, t.photo, t.typology, t.muscle_group, t.created_at
//   FROM training t
//   LEFT JOIN likes l ON l.id_training = t.id
//     `;

//   const sqlValues = [];
//   let sqlClause = 'WHERE';

//   if (typology) {
//     sqlQuery += ` ${sqlClause} typology LIKE ?`;
//     sqlValues.push(`%${typology}%`);
//     sqlClause = 'AND';
//   }

//   if (muscle_group) {
//     sqlQuery += ` ${sqlClause} muscle_group LIKE ?`;
//     sqlValues.push(`%${muscle_group}%`);
//   }
//   sqlQuery += `GROUP BY (l.id_training)`;
//   //--------------------------------------------------------------------------------
//   if (order_by === 'name') {
//     sqlQuery += `ORDER BY name`;
//   }

//   if (order_by === 'date') {
//     sqlQuery += `ORDER BY created_at DESC`;
//   }
//   if (order_by === 'likes') {
//     sqlQuery += `ORDER BY likes`;
//   }

//   //--------------------------------------------------------------------------------
//   console.log(sqlQuery);
//   console.log("🚀 ~ selectTraining ~ sqlQuery:", sqlQuery)
//   const [training] = await pool.query(sqlQuery, sqlValues);

//   return training;
// };

// export default selectTraining;
// // SELECT COUNT(*) AS likes, t.name, t.description, t.photo, t.typology, t.muscle_group, t.created_at
// // FROM training t
// // LEFT JOIN likes l ON l.id_training = t.id
// // WHERE t.typology LIKE ?
// // GROUP BY t.id; -- Corregido el GROUP BY
// Función para listar todos los entrenamientos, podemos además filtrar por tipologia, grupo muscular y ordenar por fecha o nombre  con query strings
const selectTraining = async ({ typology, muscle_group, order_by }) => {
  let sqlQuery = `SELECT count(l.id_training) AS allLikes, t.name, t.description, t.photo, t.typology, t.muscle_group, t.created_at 
  FROM training t
  LEFT JOIN likes l ON l.id_training = t.id `;

  const sqlValues = [];
  let sqlClause = ' WHERE';

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
  const [training] = await pool.query(sqlQuery, sqlValues);

  return training;
};

export default selectTraining;
