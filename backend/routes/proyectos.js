const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los proyectos
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM proyectos';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener proyectos:', err);
      return res.status(500).json({ error: 'Error al obtener proyectos' });
    }
    res.json(results);
  });
});

module.exports = router;
