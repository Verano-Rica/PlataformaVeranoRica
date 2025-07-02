const express = require('express');
const router = express.Router();
const pool = require('../../db');

// Obtener todas las evaluaciones desde la vista
router.get('/', async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM vista_evaluaciones_completa');
    res.json(result);
  } catch (error) {
    console.error('Error al consultar vista evaluaciones:', error);
    res.status(500).json({ error: 'Error al consultar la vista de evaluaciones' });
  }
});

module.exports = router;
