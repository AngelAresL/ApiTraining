import pool from '../../db/pool.js';
// Función para seleccionar entrenamiento por Id.
const selectTrainingByIdAllLikes = async (loggedId,pageSize,offset) => {
  const [training] = await pool.query(
    `SELECT count(l.id_training) AS allLikes, BIT_OR(l.id_user=?) AS likeTrue,  BIT_OR(f.id_user=?) AS favTrue, t.id, t.name, t.description, t.photo, t.typology, t.muscle_group, t.created_at 
    FROM training t
    LEFT JOIN likes l ON l.id_training = t.id	
    LEFT JOIN favorites f ON f.id_training = t.id

    GROUP BY (t.id)
    LIMIT ? OFFSET ?
    `,
    [loggedId, loggedId, pageSize, offset]
  );

  return training;
};

export default selectTrainingByIdAllLikes;
