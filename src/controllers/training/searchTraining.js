import { selectTraining } from '../../models/training/index.js';

const searchTraining = async (req, res, next) => {
  const loggedId=req.auth.id;
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;

    const training = await selectTraining({
      ...req.query,
      offset,
      pageSize,
    },loggedId);

    res.send({
      message: 'Entrenamientos seleccionados.',
      data: training,
    });
  } catch (error) {
    next(error);
  }
};

export default searchTraining;
