const db = require('../../db');

exports.obtenerEvaluacionPorUsuario = (req, res) => {
  const idUsuario = req.params.id;

  const query = `
    SELECT e.*, u.nombre, u.apellido_paterno, u.apellido_materno, u.correo
    FROM evaluaciones e
    JOIN usuarios u ON u.id = e.id_usuario
    WHERE e.id_usuario = ?
  `;

  db.query(query, [idUsuario], (err, results) => {
    if (err) {
      console.error('Error al obtener evaluación:', err);
      return res.status(500).json({ error: 'Error del servidor' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Evaluación no encontrada' });
    }

    res.json(results[0]);
  });
};

