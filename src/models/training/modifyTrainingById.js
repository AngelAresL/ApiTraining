import pool from '../../db/pool.js';

const modifyTrainingById = async (name, description, photo, typology, muscle_group, id_user, trainingId) => {
  try {
    const [updateRow] = await pool.query(
      `UPDATE training 
      SET name=?, description=?, photo=?, typology=?, muscle_group=?, id_user=?, modifyAt=CURRENT_TIMESTAMP 
      WHERE id=?`,
      [name, description, photo, typology, muscle_group, id_user, trainingId]
    );

    return updateRow;
  } catch (error) {
    throw error; // Propaga el error para ser manejado por el código que llame a esta función
  }
};

export default modifyTrainingById;

