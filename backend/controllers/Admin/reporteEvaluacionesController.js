const db = require('../../db');

exports.obtenerReporteEvaluaciones = (req, res) => {
  const query = `
    SELECT e.*, u.nombre, u.apellido_paterno, u.apellido_materno, u.correo
    FROM evaluaciones e
    JOIN usuarios u ON u.id = e.id_usuario
    ORDER BY e.fecha_evaluacion DESC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Error al obtener las evaluaciones:', err);
      return res.status(500).json({ error: 'Error al consultar evaluaciones' });
    }
    res.json(results);
  });
};
