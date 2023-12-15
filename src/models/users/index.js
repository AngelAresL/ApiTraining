// Este archivo lo utilizamos para unificar los import y export de la carpeta users.
import insertUser from './insertUser.js';
import selectUserByEmail from './selectUserByEmail.js';
import selectUserById from './selectUserById.js';
import modifyPasswordUser from './modifyPasswordUser.js';
import removeUserById from './removeUserById.js';

export {
  insertUser,
  selectUserByEmail,
  selectUserById,
  modifyPasswordUser,
  removeUserById,
};
