import { generateError } from './index.js';

const existingData = (bodyData, existingData, error) => {
  const { name, description, typology, muscle_group } = bodyData;

  if (
    name === existingData.name &&
    description === existingData.description &&
    typology === existingData.typology &&
    muscle_group === existingData.muscle_group
  ) {
    generateError(error, 400);
  }
};
export default existingData;
