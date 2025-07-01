const db = require('../../db');

// Obtener todos los seleccionados para la tabla del admin
exports.obtenerTodosSeleccionados = (req, res) => {
  const query = `
    SELECT 
      us.id_usuario,
      us.nombre,
      us.apellido_paterno,
      us.apellido_materno,
      us.correo,
      us.telefono,
      us.area_id,
      a.nombre AS nombre_area_formulario,
      us.area_final_id,
      us.subarea_especifica,
      us.proyecto_asignado_final,
      us.motivo_rechazo
    FROM usuarios_seleccionados us
    LEFT JOIN areas a ON us.area_id = a.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Error al obtener seleccionados:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.json(results);
  });
};

// Obtener un usuario seleccionado por ID
exports.obtenerSeleccionadoPorId = (req, res) => {
  const idUsuario = req.params.id;

  const query = `
    SELECT 
      u.id AS id_usuario,
      u.nombre,
      u.apellido_paterno,
      u.apellido_materno,
      u.correo,
      df.telefono,
      df.area_id,
      a.nombre AS nombre_area_formulario,
      us.area_final_id,
      us.subarea_especifica,
      us.proyecto_asignado_final,
      us.motivo_rechazo
    FROM usuarios u
    JOIN datos_formulario df ON u.id = df.id_usuario
    JOIN areas a ON df.area_id = a.id
    LEFT JOIN usuarios_seleccionados us ON u.id = us.id_usuario
    WHERE u.id = ?
  `;

  db.query(query, [idUsuario], (err, results) => {
    if (err) {
      console.error('❌ Error al obtener seleccionado:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }

    if (results.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json(results[0]);
  });
};

// Insertar o actualizar selección final
exports.actualizarSeleccion = (req, res) => {
  const idUsuario = req.params.id;
  const {
    area_final_id,
    subarea_especifica,
    proyecto_asignado_final,
    estado_seleccion,
    motivo_rechazo
  } = req.body;

  const query = `
    INSERT INTO usuarios_seleccionados (
      id_usuario, nombre, apellido_paterno, apellido_materno,
      universidad, carrera, semestre, correo, telefono,
      area_id, otra_area_interes,
      proyecto1, proyecto2, otro_proyecto, cv_nombre,
      area_final_id, subarea_especifica, proyecto_asignado_final,
      estado_seleccion, motivo_rechazo
    )
    SELECT 
      u.id, u.nombre, u.apellido_paterno, u.apellido_materno,
      df.universidad, df.carrera, df.semestre, u.correo, df.telefono,
      df.area_id, df.otra_area_interes,
      ea.proyecto1, ea.proyecto2, ea.otro_proyecto, ea.cv_nombre,
      ?, ?, ?, ?, ?
    FROM usuarios u
    JOIN datos_formulario df ON u.id = df.id_usuario
    JOIN entrevistas_agendadas ea ON u.id = ea.id_usuario
    WHERE u.id = ?
    ON DUPLICATE KEY UPDATE
      area_final_id = VALUES(area_final_id),
      subarea_especifica = VALUES(subarea_especifica),
      proyecto_asignado_final = VALUES(proyecto_asignado_final),
      estado_seleccion = VALUES(estado_seleccion),
      motivo_rechazo = VALUES(motivo_rechazo);
  `;

  db.query(
    query,
    [
      area_final_id,
      subarea_especifica,
      proyecto_asignado_final,
      estado_seleccion,
      motivo_rechazo,
      idUsuario
    ],
    (err) => {
      if (err) {
        console.error('❌ Error al guardar selección:', err);
        return res.status(500).json({ mensaje: 'Error al guardar selección' });
      }

      const actualizarEstadoUsuario = `UPDATE usuarios SET estado_proceso = ? WHERE id = ?`;
      db.query(actualizarEstadoUsuario, [estado_seleccion, idUsuario], (err2) => {
        if (err2) {
          console.error('⚠ Error al actualizar estado_proceso:', err2);
          return res.status(500).json({ mensaje: 'Error al actualizar estado del usuario' });
        }

        res.json({ mensaje: '✔ Decisión guardada correctamente' });
      });
    }
  );
};
