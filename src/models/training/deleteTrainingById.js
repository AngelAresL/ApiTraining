import pool from '../../db/pool.js';
import generateError from '../../helpers/generateError.js';
const deleteTrainingById = async (id) => {
  try {
    const query = 'DELETE FROM training WHERE id = ?';
    await pool.query(query, [id]);
    console.log(query);

    // console.log(JSON.parse(JSON.stringify(response)));

    return {
      status: 200,
      message: 'Entreno borrado con éxito',
    };
  } catch (error) {
    throw generateError('Error interno del servidor al borrar el entreno', 500);
  }
};
export default deleteTrainingById;
