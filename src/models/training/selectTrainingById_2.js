import pool from '../../db/pool.js';
// Función para seleccionar entrenamiento por Id.
const selectTrainingById_2 = async (id) => {
  const [[training]] = await pool.query(`
    SELECT count(l.id_training) AS allLikes, t.name, t.description, t.photo, t.typology, t.muscle_group, t.created_at 
    FROM training t
    INNER JOIN likes l ON l.id_training = t.id
    GROUP BY (t.id)
    HAVING t.id=?;
  `, [id]
  );

  return training;
};

export default selectTrainingById_2;
