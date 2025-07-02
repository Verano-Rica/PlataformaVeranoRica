// backend/routes/Admin/evaluacionesVista.js
const express = require('express');
const router = express.Router();
const controller = require('../../controllers/Admin/evaluacionesVistaController');

router.get('/', controller.obtenerEvaluacionesVista);

module.exports = router;
