import pool from '../../db/pool.js';
// Función para agregar un nuevo usuario.
// const insertUser = async ( name, email, hashedPassword, rol ) => {
//   const [{ insertId }] = await pool.query(
//     'INSERT INTO users (name, email, password, rol ) VALUES (?, ?, ?, ?)',
//     [name, email, hashedPassword, rol]
//   );

//   return insertId;
// };ç
const insertUser = async (name, email, hashedPassword) => {
  const [{ insertId }] = await pool.query(
    'INSERT INTO users (name, email, password ) VALUES (?, ?, ?)',
    [name, email, hashedPassword]
  );
  console.log(insertId);
  return insertId;
};

export default insertUser;
