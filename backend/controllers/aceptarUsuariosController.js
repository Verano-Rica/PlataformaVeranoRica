const db = require('../db');

const obtenerUsuarios = (req, res) => {
  const query = `
    SELECT u.id AS id_usuario, u.nombre, u.apellido_paterno, df.universidad, df.carrera,
           a.nombre AS area, ea.proyecto1, ea.cv_nombre
    FROM usuarios u
    JOIN datos_formulario df ON u.id = df.id_usuario
    JOIN entrevistas_agendadas ea ON u.id = ea.id_usuario
    JOIN areas a ON df.area_id = a.id
    WHERE u.id NOT IN (SELECT id_usuario FROM usuarios_aceptados)
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener usuarios' });
    res.json(results);
  });
};

const actualizarEstado = (req, res) => {
  const { id_usuario, decision } = req.body;

  if (!id_usuario || !['aceptar', 'rechazar'].includes(decision)) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  const estatus = decision === 'aceptar' ? 1 : 0;
  const nuevoEstado = decision === 'aceptar' ? 4 : 9; // FASE 4 o Rechazado

  const insertQuery = `
    INSERT INTO usuarios_aceptados (
      id_usuario, nombre, apellido_paterno, apellido_materno,
      universidad, carrera, semestre, correo, telefono,
      area_id, otra_area_interes, proyecto1, proyecto2,
      otro_proyecto, cv_nombre, estatus
    )
    SELECT 
      u.id, df.nombre, df.apellido_paterno, df.apellido_materno,
      df.universidad, df.carrera, df.semestre, df.correo, df.telefono,
      df.area_id, df.otra_area_interes, ea.proyecto1, ea.proyecto2,
      ea.otro_proyecto, ea.cv_nombre, ?
    FROM usuarios u
    JOIN datos_formulario df ON u.id = df.id_usuario
    JOIN entrevistas_agendadas ea ON u.id = ea.id_usuario
    WHERE u.id = ?
  `;

  db.query(insertQuery, [estatus, id_usuario], (err) => {
    if (err) return res.status(500).json({ error: 'Error al guardar decisión' });

    // ✅ Actualiza estado_proceso en la tabla usuarios
    const updateEstado = `UPDATE usuarios SET estado_proceso = ? WHERE id = ?`;
    db.query(updateEstado, [nuevoEstado, id_usuario], (updateErr) => {
      if (updateErr) {
        console.error('Error al actualizar estado_proceso:', updateErr);
        return res.status(500).json({ error: 'Decisión guardada pero falló estado_proceso' });
      }

      res.json({ mensaje: `Usuario ${decision} correctamente y estado actualizado` });
    });
  });
};

module.exports = {
  obtenerUsuarios,
  actualizarEstado
};
