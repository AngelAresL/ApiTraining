// Este archivo lo utilizamos para unificar los import y export de la carpeta users.
import verifyRole from './verifyRole.js';
import login from './login.js';
import register from './register.js';
import removeUser from './removeUserById.js';
import rolToAdmin from './changeRolToAdmin.js';
import rolToNormal from './changeRolToNormal.js';
import removeUserByEmail from './removeUserByEmail.js';

export {
  login,
  register,
  removeUser,
  verifyRole,
  rolToAdmin,
  rolToNormal,
  removeUserByEmail,
};
