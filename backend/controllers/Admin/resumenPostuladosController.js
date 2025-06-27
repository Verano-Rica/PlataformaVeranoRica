// backend/controllers/Admin/resumenPostuladosController.js
const db = require('../../db');

const obtenerResumenPostulados = (req, res) => {
  const query = 'SELECT * FROM vista_resultado_seleccion';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener el resumen de postulantes:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.json(results);
  });
};

module.exports = { obtenerResumenPostulados };
