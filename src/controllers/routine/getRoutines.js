import { selectAllRoutines } from '../../models/routine/index.js';

const getRoutines = async (req, res, next) => {
  try {
    const routines = await selectAllRoutines();


    res.send({
      message: 'Rutinas seleccionadas.',
      data: routines,
    });
  } catch (error) {
    next(error);
  }
};

export default getRoutines;
