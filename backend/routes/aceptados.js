const express = require('express');
const router = express.Router();
const { obtenerEstadoAceptacion } = require('../controllers/aceptarUsuariosController');

router.get('/estado/:id', obtenerEstadoAceptacion);

module.exports = router;
