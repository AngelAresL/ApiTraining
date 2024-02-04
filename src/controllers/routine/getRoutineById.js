import { selectRoutineById } from '../../models/routine/index.js';

const getRoutineById = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log('🚀 ~ getRoutineById ~ id:', id);
    const routines = await selectRoutineById(id);

    console.log('🚀 ~ getRoutines ~ routines:', routines);

    res.send({
      message: 'Rutina seleccionada.',
      data: routines,
    });
  } catch (error) {
    next(error);
  }
};

export default getRoutineById;
