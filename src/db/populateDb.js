import pool from './pool.js';
import useDb from './useDb.js';
import { DB_NAME } from '../../env.js';
// Poblamos base de datos para pruebas
const populateDb = async () => {
  try {
    await useDb();
    await pool.query(`
    INSERT INTO users (name,email,password,rol) VALUES
        ("David","barry@email.com", "$2b$10$hVbvxTk/5m25B1GToQlPueIIdHwzy.QOJ63QGoE12370h9jk9fqMu","normal"),
        ("pepe", "bar2@gmail","$2b$10$CC6JLkcwjm5VOY6ah8a/c.dISPllYMA/2PMQCed2GhO5wDkak.lBa", "admin"),
        ("Manolo","prueba@email.com","$2b$10$GEvexLm0QoAW618IAKL1y.mLb.GE1anWvyYeXKUAyZoGNW0KRXqk.", "admin");
    `);

    await pool.query(`
    INSERT INTO training (name, description, typology, muscle_group, id_user) 
VALUES ('Press de Banca', '4 series de 15 repeticiones', 'Fuerza', 'Pecho',2),			
('Flexiones', '10 series de 3 repeticiones', 'Fuerza', 'Pecho',2),			
('Sentadillas', '5 series de 12 repeticiones', 'Fuerza', 'Pierna',2),			
('Plancha', '2 series de 60 segundos', 'Fuerza', 'Core',2),			
('Curl de Bíceps', '3 series de 10 repeticiones', 'Fuerza', 'Biceps',2),			
('Cardio: Correr en intervalos', '3 minutos a ritmo moderado + 1 min max. potencia', 'Cardio', 'Cuerpo completo',2),			
('Cardio: Saltar la cuerda', '15 minutos a ritmo rápido', 'Cardio', 'Cuerpo completo',2),			
('Peso Muerto', '4 series de 8 repeticiones', 'Fuerza', 'Pierna',2),			
('Zancadas', '3 series de 12 repeticiones por pierna', 'Fuerza', 'Pierna',2),			
('Cardio: cinta o bicicleta', '45 minutos a ritmo constante', 'Cardio', 'Pierna',2),			
('Press Militar', '3 series de 10 repeticiones', 'Fuerza', 'Hombros',2),			
('Burpees', '5 series de 10 repeticiones', 'Fuerza', 'Cuerpo completo',2),			
('Cardio: Elíptica', '20 minutos a ritmo constante', 'Cardio', 'Cuerpo completo',2),			
('Fondos en Paralelas', '3 series de 12 repeticiones', 'Fuerza', 'Tríceps',2),			
('Mountain Climbers', '4 series de 20 repeticiones', 'Fuerza', 'Core',2),			
('Remo con Barra', '4 series de 10 repeticiones', 'Fuerza', 'Espalda',2),
('Sentadilla Búlgara', '4 series de 10 repeticiones por pierna', 'Fuerza', 'Pierna',2)	
;
    `);

    console.log('Base de datos poblada.');
  } catch (error) {
    console.error(`Error al insertar los datos en la bbdd ${DB_NAME}`);
  } finally {
    process.exit();
  }
};

populateDb();
