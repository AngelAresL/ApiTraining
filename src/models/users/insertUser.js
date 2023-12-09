import pool from '../../db/pool.js';

const insertUser = async ( name, email, hashedPassword, rol ) => {
  const [{ insertId }] = await pool.query(
    'INSERT INTO users (name, email, password, rol ) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, rol]
  );

  return insertId;
};

export default insertUser;
