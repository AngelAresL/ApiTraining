import pool from '../../db/pool.js';
// Función para eliminar un like de un entrenamiento.
const checkedFav = async (loggedId, trainingId) => {
 
const checked= await pool.query(`
        SELECT BIT_OR(id_user=?) FavTrue FROM favorites WHERE id_training=?;
        `,[loggedId, trainingId]);  

 return checked[0];
    
        
};


export default checkedFav;