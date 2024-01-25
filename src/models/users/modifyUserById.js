import pool from '../../db/pool.js';
// Función para agregar un nuevo usuario.

const modifyUserById = async (
  loggedUserId,
  name,
  email,
  hashedPassword,
  rol
) => {
  const [user] = await pool.query(
    `
        UPDATE users
        SET name=?, email=?, password=?, rol=?, modify_at=CURRENT_TIMESTAMP 
        WHERE id=?`,
    [name, email, hashedPassword, rol, loggedUserId]
  );

  return user;
};

export default modifyUserById;
