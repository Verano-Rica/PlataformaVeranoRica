const express = require('express');
const router = express.Router();
const estadoCtrl = require('../controllers/estadoProcesoController');

router.get('/actualizar/:id_usuario', estadoCtrl.actualizarEstadoProceso);
router.get('/:id', estadoCtrl.obtenerEstado);

module.exports = router;
