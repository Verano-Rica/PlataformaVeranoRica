const express = require('express');
const router = express.Router();
// ✅ correcto
const controller = require('../../controllers/Admin/busquedaEntrevistaController');


router.get('/buscar', controller.buscarPorNombre);
router.post('/guardar', controller.guardarEvaluacion);

module.exports = router;
