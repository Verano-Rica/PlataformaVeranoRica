const express = require('express');
const router = express.Router();
const { obtenerResumenPostulados } = require('../../controllers/Admin/resumenPostuladosController');

router.get('/resumen-postulados', obtenerResumenPostulados);

module.exports = router;
