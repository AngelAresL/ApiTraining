
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { selectUserByEmail } from "../../models/users/index.js";
import { generateError } from "../../helpers/index.js";
import { TOKEN_SECRET } from "../../../env.js";

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userDb = await selectUserByEmail(email);  

    if (!userDb) {
      generateError("Los datos no son correctos", 400);
    }

    
    console.log(password, userDb.password);
    const isPasswordOk = await bcrypt.compare(password, userDb.password);

    if (!isPasswordOk) {
      generateError("Los datos no son correctos, password", 400);
    }

    const jwtPayload = { id: userDb.id };

    const token = jwt.sign(jwtPayload, TOKEN_SECRET, {
      expiresIn: "30d",
    });

    res.send({ message: "Loggeado correctamente", data: { token } });
    
  } catch (error) {
    next(error);
  }
};

export default login;
