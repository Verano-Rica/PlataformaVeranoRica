const db = require('../db');

// Actualiza el campo estado_proceso del usuario automáticamente
const actualizarEstadoProceso = (req, res) => {
  const { id_usuario } = req.params;

  if (!id_usuario) return res.status(400).json({ error: 'Falta el ID de usuario' });

  // Consulta en cascada: primero entrevista, luego formulario
  const queryEntrevista = 'SELECT 1 FROM entrevistas_agendadas WHERE id_usuario = ?';
  const queryFormulario = 'SELECT 1 FROM datos_formulario WHERE id_usuario = ?';
  const queryAceptado = 'SELECT estatus FROM usuarios_aceptados WHERE id_usuario = ?';

  db.query(queryEntrevista, [id_usuario], (errE, resE) => {
    if (errE) return res.status(500).json({ error: 'Error en entrevistas' });

    if (resE.length > 0) {
      // Ya agendó entrevista → estado 2
      return db.query(
        'UPDATE usuarios SET estado_proceso = 2 WHERE id = ?',
        [id_usuario],
        () => res.json({ mensaje: 'Actualizado a FASE 2' })
      );
    }

    db.query(queryFormulario, [id_usuario], (errF, resF) => {
      if (errF) return res.status(500).json({ error: 'Error en formulario' });

      if (resF.length > 0) {
        // Ya llenó formulario → estado 1
        return db.query(
          'UPDATE usuarios SET estado_proceso = 1 WHERE id = ?',
          [id_usuario],
          () => res.json({ mensaje: 'Actualizado a FASE 1' })
        );
      }

      // Si no ha hecho nada → estado 0
      db.query(
        'UPDATE usuarios SET estado_proceso = 0 WHERE id = ?',
        [id_usuario],
        () => res.json({ mensaje: 'Sin avance. Estado: 0' })
      );
    });
  });
};

// También puedes consultar directamente el estado
const obtenerEstado = (req, res) => {
  const { id } = req.params;
  db.query('SELECT estado_proceso FROM usuarios WHERE id = ?', [id], (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(results[0]);
  });
};

module.exports = {
  actualizarEstadoProceso,
  obtenerEstado
};
