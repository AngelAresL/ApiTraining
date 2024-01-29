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
    INSERT INTO training (name, description,photo, typology, muscle_group, id_user) 
VALUES ('Press de Banca', '4 series de 15 repeticiones','pecho1.png', 'Fuerza', 'Pecho',2),
('Press de Banca', '4 series de 15 repeticiones','pecho.png', 'Fuerza', 'Pecho',2),
('Press de Banca', '4 series de 15 repeticiones','press-hombro.jpg', 'Fuerza', 'Pecho',2),
('Press de Banca', '4 series de 15 repeticiones','press-pecho.jpg', 'Fuerza', 'Pecho',2),
('Press de Hombro', 'Para su ejecución comenzaremos sentados en un banco, con la espalda bien recta y tomaremos en ambas manos una mancuerna. Llevaremos las mismas a la altura de los hombros por los laterales del cuerpo mientras flexionamos los codos y las palmas de la mano miran hacia adelante.
Desde los hombros inspiramos y elevamos las mancuernas hasta estirar los brazos hacia arriba, verticalmente. Espiramos al finalizar el movimiento mientras iniciamos el descenso a la posición inicial.Este ejercicio puede ejecutarse de pie, aunque generalmente se realiza sentado y puede incluirse un respaldo para evitar la curvatura de la espalda durante el ejercicio. También puede realizarse alternando los dos brazos.','press-hombro.jpg', 'Fuerza', 'Hombro',2),
('Elevaciones Laterales', 'Para comenzar el ejercicio debemos colocarnos de pie, con las piernas ligeramente flexionadas y separadas del ancho de la cadera. La espalda debe permanecer recta y en cada mano debemos sujetar una mancuerna, mientras los brazos permanecen a los lados del cuerpo o delante de los muslos, levemente flexionados.
Tomando aire elevamos las mancuernas hasta que los brazos queden alineados con los hombros y desde allí bajamos lentamente mientras exhalamos.Las elevaciones laterales se pueden hacer con ambas manos juntas o también, alternando un brazo y otro. También puede efectuarse con poleas.','elevaciones-laterales.jpg', 'Fuerza', 'Hombro',2),
('Elevaciones Frontales', 'Para comenzar el movimiento debemos colocarnos de pie, con los pies ligeramente separados y mancuernas asidas con las manos en pronación o palmas hacia abajo, es decir, con el dorso de la mano mirando hacia afuera y los dedos hacia el cuerpo.
Las mancuernas deben apoyarse junto a las manos sobre los muslos, ligeramente hacia los costados. Inspiramos y comenzamos a contraer los músculos para elevar un brazo hacia adelante mientras espiramos el aire.
','elevaciones-frontales.jpg', 'Fuerza', 'Hombro',2),
('Sentadilla', 'La sentadilla o squat es un movimiento que se inicia de pie, mirando al frente y con la espalda recta, mientras los pies se separan del ancho de los hombros.
La barra utilizada debe situarse justo encima de los trapecios, no debe apoyarse en el cuello.
Siempre mirando al frente y sin curvar la espalda, debemos descender los glúteos flexionando la rodilla y la cadera,  y cuidando que la rodilla no pase de la punta del pie ni sobrepase los 90 grados de flexión. Descendemos hasta que los muslos quedan paralelos al suelo y desde allí debemos elevarnos lentamente mientras exhalamos el aire inhalado al comenzar el descenso del cuerpo.Podemos hacer la sentadilla sin peso o en máquina para un recorrido guiado. También se pueden usar otro tipo de cargas o resistencias al realizar el movimiento, por ejemplo, mancuernas, gomas u otros.','sentadilla.jpg', 'Fuerza', 'Pierna',2)


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
