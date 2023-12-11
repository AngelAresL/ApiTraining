import pool from '../../db/pool.js';

const modifyPasswordUser = async (password, id) => {
  const [{ insertId }] = await pool.query(
    'UPDATE users SET  password = ? WHERE id = ?',
    [password, id]
  );

  return insertId;
};

export default modifyPasswordUser;
