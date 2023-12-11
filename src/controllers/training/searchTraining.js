import { selectTraining } from '../../models/training/index.js';

const searchTraining = async (req, res, next) => {
  try {
    const training = await selectTraining(req.query);

    res.send({
      message: 'Entrenos seleccionados',
      data: training,
    });
  } catch (error) {
    next(error);
  }
};

export default searchTraining;
