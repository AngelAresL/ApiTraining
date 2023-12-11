import Joi from 'joi';
import { generateError } from './index.js';

const validateJoiTraining = async ({
  name,
  description,
  typology,
  muscle_group,
}) => {
  const schema = Joi.object().keys({
    name: Joi.string().max(50).required(),
    description: Joi.string().max(200).required(),
    typology: Joi.string().max(50).required(),
    muscle_group: Joi.string().max(50).required(),
  });
  const validation = schema.validate({
    name,
    description,
    typology,
    muscle_group,
  });
  if (validation.error) {
    return generateError(validation.error.message, 400);
  }
};

export default validateJoiTraining;
