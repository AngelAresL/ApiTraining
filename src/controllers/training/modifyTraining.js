import generateError from '../../helpers/generateError.js';
const modifyTraining = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'no implementada',
    });
  } catch (error) {
    next(error);
  }
};

modifyTraining: (req, res) => {
  const trainingId = req.params.trainingId;
  const { name, description, exercises, date } = req.body;

  db.query(
    "UPDATE trainings SET name = ?, description = ?, exercises = ?, date = ? WHERE id = ?",
    [name, description, JSON.stringify(exercises), date, trainingId],
    (error, result) => {
      if (error) {
        res.status(500).json({ error: "Error al actualizar el entrenamiento" });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Entrenamiento no encontrado" });
        return;
      }

      res.status(200).json({ message: "Entrenamiento actualizado correctamente" });
    }
  );
}

export default modifyTraining;
