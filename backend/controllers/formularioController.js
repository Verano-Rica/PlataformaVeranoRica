const db = require('../db');

exports.guardarFormulario = (req, res) => {
  const {
    id_usuario,
    nombre,
    apellido_paterno,
    apellido_materno,
    universidad,
    carrera,
    semestre,
    correo,
    telefono,
    area_id,
    otra_area_interes
  } = req.body;

  // Verifica si ya existe un formulario para ese usuario
const verificarQuery = 'SELECT id_formulario FROM datos_formulario WHERE id_usuario = ?';


  db.query(verificarQuery, [id_usuario], (error, resultados) => {
    if (error) {
      console.error('Error al verificar existencia:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }

    if (resultados.length > 0) {
      // Si ya existe, NO insertamos de nuevo
      return res.status(400).json({ mensaje: 'Ya existe un formulario para este usuario' });
    }

    // Si no existe, insertamos el nuevo registro
    const insertarSQL = `
      INSERT INTO datos_formulario 
      (id_usuario, nombre, apellido_paterno, apellido_materno, universidad, carrera, semestre, correo, telefono, area_id, otra_area_interes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertarSQL,
      [
        id_usuario,
        nombre,
        apellido_paterno,
        apellido_materno,
        universidad,
        carrera,
        semestre,
        correo,
        telefono,
        area_id,
        otra_area_interes || null
      ],
      (err, result) => {
        if (err) {
          console.error('Error al insertar en la base de datos:', err);
          return res.status(500).json({ mensaje: 'Error al guardar el formulario' });
        }

        res.status(200).json({ mensaje: 'Formulario guardado exitosamente' });
      }
    );
  });
};
