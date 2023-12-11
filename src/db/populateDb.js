import pool from "./pool.js";
import useDb from "./useDb.js";
import { DB_NAME } from "../../env.js";


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
    INSERT INTO training (name, description, photo, typology, muscle_group, id_user) VALUES
        ("pressbanca", "Ejercicios de pecho", null,"fuerza", "pectorales", 2),
        ("sentadillas","subir y bajar", "foto.jpg", "cardio", "piernas", 2);
    `);

    console.log('Base de datos poblada.');
} catch (error) {
    console.error(
      `Error al insertar los datos en la bbdd ${DB_NAME}`
    );
    process.exit(1);
  }
};

populateDb();