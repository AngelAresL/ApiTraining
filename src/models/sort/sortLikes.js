import pool from '../../db/pool.js';
import {generateError} from '../../helpers/index.js';

const sortLikes = async () => {

try{  
    const [sort] = await pool.query(`
      SELECT count(*) AS likes, t.name, t.description, t.photo, t.typology, t.muscle_group , t.createdAt
      FROM training t
      INNER JOIN likes l ON l.id_training = t.id
      GROUP BY (l.id_training) 
      ORDER BY likes DESC;
    `)
    return sort;


}catch(error){
  generateError(error, error.statusCode || 500);
}
}


export default sortLikes;