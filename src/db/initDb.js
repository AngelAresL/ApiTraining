import pool from './pool.js';
import useDb from './useDb.js';
import { DB_NAME } from '../../env.js';

const initDb = async () => {
  try {
    await pool.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME};`);

    await useDb();

    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            rol ENUM('admin','normal') DEFAULT 'normal',          
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS training (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            description VARCHAR(200) NOT NULL,
            photo VARCHAR(100),           
            typology VARCHAR(50) NOT NULL,
            muscle_group VARCHAR(50) NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,    
            modifyAt DATETIME DEFAULT CURRENT_TIMESTAMP,       
            id_user INT UNSIGNED NOT NULL,
            FOREIGN KEY (id_user) REFERENCES users (id)
        );
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS likes (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          id_user INT UNSIGNED NOT NULL,
          id_training INT UNSIGNED NOT NULL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (id_user) REFERENCES users (id),
          FOREIGN KEY (id_training) REFERENCES training (id)

        );
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS favorites (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          id_user INT UNSIGNED NOT NULL,
          id_training INT UNSIGNED NOT NULL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (id_user) REFERENCES users (id),
          FOREIGN KEY (id_training) REFERENCES training (id)
        );
    `);

    console.log('¡Base de datos creada satisfactoriamente! 😄');
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
};

initDb();
