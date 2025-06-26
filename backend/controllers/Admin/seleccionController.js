const db = require('../../db');

const obtenerUsuariosAceptados = (req, res) => {
  const query = `
    SELECT 
      ua.id_usuario,
      u.nombre,
      u.apellido_paterno,
      u.apellido_materno,
      ua.universidad,
      ua.carrera,
      ua.semestre,
      ua.correo,
      ua.telefono,
      a.nombre AS area,
      ua.proyecto1,
      su.area_final_id,
      su.subarea,
      su.proyecto_asignado
    FROM usuarios_aceptados ua
    JOIN usuarios u ON ua.id_usuario = u.id
    LEFT JOIN areas a ON ua.area_id = a.id
    LEFT JOIN seleccion_usuarios su ON ua.id_usuario = su.id_usuario;
  `;

  db.query(query, (err, resultados) => {
    if (err) {
      console.error('Error al obtener usuarios aceptados:', err);
      return res.status(500).json({ mensaje: 'Error en el servidor' });
    }
    return res.json(resultados);
  });
};

const guardarAsignacionFinal = (req, res) => {
  const { area_final_id, subarea, proyecto_asignado } = req.body;
  const { id_usuario } = req.params;

  if (!id_usuario || !area_final_id || !proyecto_asignado) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
  }

  const query = `
    UPDATE seleccion_usuarios
    SET 
      area_final_id = ?,
      subarea = ?,
      proyecto_asignado = ?
    WHERE id_usuario = ?
  `;

  db.query(query, [area_final_id, subarea, proyecto_asignado, id_usuario], (err, result) => {
    if (err) {
      console.error('Error al guardar selección final:', err);
      return res.status(500).json({ mensaje: 'Error al guardar datos' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado para actualizar' });
    }

    return res.json({ mensaje: 'Asignación guardada correctamente' });
  });
};

module.exports = {
  obtenerUsuariosAceptados,
  guardarAsignacionFinal
};
