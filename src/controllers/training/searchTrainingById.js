import { selectTrainingById } from '../../models/training/index.js';

const searchTrainingById = async (req, res, next) => {
  try {
    const training = await selectTrainingById(req.params.idtraining);
    console.log(training);

    res.send({ message: 'Entreno seleccionado', data: training });
  } catch (error) {
    next(error);
  }
};

export default searchTrainingById;
