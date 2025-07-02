const express = require('express');
const router = express.Router();
const evaluacionController = require('../../controllers/Admin/evaluacionController');

// ejemplo de ruta válida
router.get('/:id', evaluacionController.obtenerEvaluacionPorUsuario);

module.exports = router;
