const db = require('../db');

exports.guardarFormulario = (req, res) => {
  const {
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

  const sql = `
    INSERT INTO datos_formulario 
    (nombre, apellido_paterno, apellido_materno, universidad, carrera, semestre, correo, telefono, area_id, otra_area_interes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [nombre, apellido_paterno, apellido_materno, universidad, carrera, semestre, correo, telefono, area_id, otra_area_interes || null],
    (err, result) => {
      if (err) {
        console.error('Error al insertar en la base de datos:', err);
        return res.status(500).json({ mensaje: 'Error al guardar el formulario' });
      }
      res.status(200).json({ mensaje: 'Formulario guardado exitosamente' });
    }
  );
};
