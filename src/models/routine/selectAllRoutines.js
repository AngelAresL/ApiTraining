import pool from '../../db/pool.js';
// Función para seleccionar todas las rutinas.
const selectAllRoutines = async () => {
  const [routines] = await pool.query('SELECT * FROM routine');

  return routines;
};

export default selectAllRoutines;
