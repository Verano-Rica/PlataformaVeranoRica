// backend/controllers/Admin/evaluacionesVistaController.js
const db = require('../../db');

exports.obtenerEvaluacionesVista = (req, res) => {
  const query = 'SELECT * FROM vista_evaluaciones_completa';

  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Error al obtener las evaluaciones desde la vista:', err);
      return res.status(500).json({ error: 'Error al consultar las evaluaciones' });
    }
    res.json(results);
  });
};
