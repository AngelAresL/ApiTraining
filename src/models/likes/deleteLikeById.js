import pool from '../../db/pool.js';

const deleteLikeById = async (id) => {
 
    await pool.query(`
        DELETE FROM likes WHERE id = ?`,
        [id]);    
};

export default deleteLikeById;