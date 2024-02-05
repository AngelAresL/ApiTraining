import validateInt from '../../helpers/regexInt.js';
import { addTrainingToRoutine } from '../../models/routine/index.js';

// Añadir un entreno a favoritos
const addToRoutine = async (req, res, next) => {
  try {
    const routineId = parseInt(req.params.idRoutine);
    const { idTraining, reps, series } = req.body;

    // Hacemos la llamada al helper de validación del numero entero
    validateInt('Id de rutina no válido.', routineId);


    // Llamamos al model para añadir a rutinas
    const resutl = await addTrainingToRoutine(
      idTraining,
      routineId,
      reps,
      series
    );
 

    res.status(200).json({
      message: 'Entrenamiento añadido a rutina con éxito.',
    });
  } catch (error) {
    next(error);
  }
};

export default addToRoutine;
