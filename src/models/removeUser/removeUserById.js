import pool from '../../db/pool.js';
import { generateError } from '../../helpers/index.js';

// Función para que un usuario pueda elminarse a sí mismo.
const removeUserById = async (id_user) => {
  try {
    // Primero borramos
    await pool.query('DELETE FROM training WHERE id_user = ?', [id_user]);
    await pool.query('DELETE FROM likes WHERE id_user = ?', [id_user]);
    await pool.query('DELETE FROM favorites WHERE id_user = ?', [id_user]);
    await pool.query('DELETE FROM users WHERE id = ?', [id_user]);
  } catch (error) {
    throw generateError(error, error.statusCode || 500);
  }
};
export default removeUserById;
