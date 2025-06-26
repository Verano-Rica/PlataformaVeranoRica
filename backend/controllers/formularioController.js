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

  const verificarQuery = 'SELECT id_formulario FROM datos_formulario WHERE id_usuario = ?';

  db.query(verificarQuery, [id_usuario], (error, resultados) => {
    if (error) {
      console.error('Error al verificar existencia:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }

    if (resultados.length > 0) {
      return res.status(400).json({ mensaje: 'Ya existe un formulario para este usuario' });
    }

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

        // Actualizar estado_proceso a 1 (FASE 1)
        const actualizarEstado = 'UPDATE usuarios SET estado_proceso = 1 WHERE id = ?';
        db.query(actualizarEstado, [id_usuario], (updateErr) => {
          if (updateErr) {
            console.error('Error al actualizar estado_proceso:', updateErr);
            return res.status(500).json({ mensaje: 'Formulario guardado pero falló actualización de estado' });
          }

          res.status(200).json({ mensaje: 'Formulario guardado y estado actualizado a FASE 1' });
        });
      }
    );
  });
};
