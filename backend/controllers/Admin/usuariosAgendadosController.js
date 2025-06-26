const db = require('../../db');

// Obtener todos los usuarios con entrevista agendada
exports.obtenerUsuariosAgendados = (req, res) => {
  const sql = `
    SELECT u.id, u.nombre, u.apellido_paterno, u.apellido_materno, u.correo,
           e.fecha_entrevista, e.nombre_bloque, e.cv_nombre
    FROM usuarios u
    INNER JOIN entrevistas_agendadas e ON u.id = e.id_usuario;
  `;

  db.query(sql, (err, resultados) => {
    if (err) {
      console.error('Error al obtener usuarios agendados:', err);
      return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
    res.json(resultados);
  });
};

// Cancelar entrevista
exports.cancelarEntrevista = (req, res) => {
  const idUsuario = req.params.id_usuario;

  const eliminarSQL = 'DELETE FROM entrevistas_agendadas WHERE id_usuario = ?';

  db.query(eliminarSQL, [idUsuario], (err) => {
    if (err) {
      console.error('Error al cancelar entrevista:', err);
      return res.status(500).json({ mensaje: 'Error al cancelar entrevista' });
    }

    const actualizarEstado = 'UPDATE usuarios SET estado_proceso = ? WHERE id = ?';
    db.query(actualizarEstado, ['formulario_enviado', idUsuario], (err2) => {
      if (err2) {
        console.error('Error al actualizar estado:', err2);
        return res.status(500).json({ mensaje: 'Error al actualizar estado' });
      }

      res.json({ mensaje: 'Entrevista cancelada correctamente' });
    });
  });
};
