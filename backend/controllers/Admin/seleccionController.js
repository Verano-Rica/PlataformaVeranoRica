const db = require('../../db');

exports.obtenerUsuariosAceptados = (req, res) => {
  const query = `
    SELECT 
      ua.id_usuario,
      ua.nombre,
      ua.apellido_paterno,
      ua.apellido_materno,
      ua.universidad,
      ua.carrera,
      ua.semestre,
      ua.proyecto1,
      ua.area_final_id,
      ua.subarea_especifica,
      ua.proyecto_asignado_final
    FROM usuarios_aceptados ua
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      return res.status(500).json({ mensaje: 'Error en la base de datos' });
    }

    res.json(results);
  });
};

exports.asignarAreaProyecto = (req, res) => {
  const id_usuario = req.params.id_usuario;
  const { area_final_id, subarea, proyecto_asignado } = req.body;

  const query = `
    UPDATE usuarios_aceptados
    SET area_final_id = ?, subarea_especifica = ?, proyecto_asignado_final = ?
    WHERE id_usuario = ?
  `;

  db.query(query, [area_final_id, subarea, proyecto_asignado, id_usuario], (err) => {
    if (err) {
      console.error('Error al asignar:', err);
      return res.status(500).json({ mensaje: 'Error al guardar asignación' });
    }

    res.json({ mensaje: '✔ Asignación guardada correctamente' });
  });
};
