const db = require('../../db');

exports.obtenerEvaluacionesVista = (req, res) => {
  const query = 'SELECT * FROM vista_evaluaciones_completa';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener evaluaciones:', err);
      return res.status(500).json({ error: 'Error al obtener evaluaciones' });
    }
    res.json(results);
  });
};

