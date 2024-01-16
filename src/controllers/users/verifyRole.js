import { selectUserById } from '../../models/users/index.js';

// Devolvemos el rol de usuario
const verifyRole = async (req, res, next) => {
  try {
    const user = await selectUserById(req.auth.id);
    console.log('rol de usuario', user.rol);
    res.send({
      message: `El usuario es: ${user.rol}`,
      rol: user.rol,
    });
  } catch (error) {
    next(error);
  }
};

export default verifyRole;
