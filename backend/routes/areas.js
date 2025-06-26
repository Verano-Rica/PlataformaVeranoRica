const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/areas - Obtener todas las áreas
router.get('/', (req, res) => {
  const query = 'SELECT id, nombre FROM areas';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener áreas:', err);
      return res.status(500).json({ mensaje: 'Error al obtener áreas' });
    }
    res.json(results);
  });
});

module.exports = router;
