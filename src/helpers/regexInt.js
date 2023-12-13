import { generateError } from './index.js';

const validateInt = (msg, id) => {
  const numRegex = /^\d+$/;

  if (!numRegex.test(id)) {
    throw generateError(msg, 404);
  }
};
export default validateInt;
