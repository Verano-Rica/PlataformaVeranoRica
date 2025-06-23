const express = require('express');
const router = express.Router();
const formularioController = require('../controllers/formularioController');

router.post('/guardar', formularioController.guardarFormulario);

module.exports = router;
