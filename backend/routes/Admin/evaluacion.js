const express = require('express');
const router = express.Router();
const evaluacionController = require('../../controllers/Admin/evaluacionController');

// Buscar por nombre
router.get('/buscar', evaluacionController.buscarPorNombre);

// Obtener evaluación individual por ID de usuario
router.get('/:id', evaluacionController.obtenerEvaluacionPorUsuario);

// Guardar evaluación
router.post('/guardar', evaluacionController.guardarEvaluacion);

module.exports = router;
