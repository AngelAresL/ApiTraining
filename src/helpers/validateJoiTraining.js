import Joi from 'joi';
import { generateError } from './index.js';

const validateJoiTraining = async ({
  name,
  description,
  typology,
  muscle_group,
}) => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .max(50)
      .required()
      .error(() => {
        generateError(
          'El nombre es obligatorio y tiene un máximo de 50 caracteres.',
          400
        );
      }),
    description: Joi.string()
      .max(200)
      .required()
      .error(() => {
        generateError(
          'La descripción es obligatoria y tiene un máximo de 200 caracteres.',
          400
        );
      }),
    typology: Joi.string()
      .max(50)
      .required()
      .error(() => {
        generateError(
          'La tipología es obligatoria y tiene un máximo de 50 caracteres',
          400
        );
      }),
    muscle_group: Joi.string()
      .max(50)
      .required()
      .error(() => {
        generateError(
          'El grupo muscular es obligatorio y tiene un máximo de 50 caracteres',
          400
        );
      }),
  });
  const validation = schema.validate({
    name,
    description,
    typology,
    muscle_group,
  });
  // if (validation.error) {
  //   return generateError(validation.error.message, 400);
  // }
};

export default validateJoiTraining;
