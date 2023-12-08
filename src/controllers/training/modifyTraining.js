import generateError from '../../helpers/generateError.js';
import pool from '../../db/pool.js';


const modifyTraining = async (req, res, next) => {
  try {
    const trainingId = req.params.id;
    const { name, description, photo, typology: typology, muscle_group, id_user } = req.body;

    //Comprobamos si el id de entrenamiento existe
    const rowExists =  await pool.query("SELECT * FROM training WHERE id = ?;", [trainingId]);

    if (!rowExists) {
      generateError("El entrenamiento no existe", 404); 
    }

    //Comprobamos si el usuario es admin o normal
    const rolUser = req.auth.rol;
  
    if (rolUser === "normal") {
      generateError("Debes de ser administrador para modificar entrenamientos", 403);
    }

    console.log(name, description, photo, typology, muscle_group, id_user, trainingId);

    //Actualizamos los datos 
    const [{changes}]= await pool.query(`
    UPDATE training SET name=?, description=?, photo=?, typology=?, muscle_group=?, id_user=? WHERE id=?`,
    [name, description, photo, typology, muscle_group, id_user, trainingId]
    );

    if (changes === 0) {
      generateError("Debes cambiar algún dato del entrenamiento", 400);
    }
    
    //const updateTraining= await selectTrainingById(trainingId);
    const updatedTraining = await pool.query("SELECT * FROM training WHERE id = ?;", [trainingId]);

    res.status(200).json({ 
      message: "Entrenamiento actualizado correctamente",
      data: updatedTraining
   });

  } catch (error) {
    next(error);
  }
};

export default modifyTraining;
