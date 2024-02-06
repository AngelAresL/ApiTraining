import pool from '../../db/pool.js';

const checkTrainingRoutine = async (routineId, trainingId) => {
  const [checkRoutine] = await pool.query(
    `
        SELECT BIT_OR(id_routine=?) TrainingCheck FROM routine_training 
        WHERE id_training=?;
        `,
    [routineId, trainingId]
  );

  return checkRoutine;
};

export default checkTrainingRoutine;
