const express = require('express');
const router = express.Router();
const controller = require('../../controllers/Admin/reporteEvaluacionesController');

router.get('/', controller.obtenerReporteEvaluaciones);

module.exports = router;
