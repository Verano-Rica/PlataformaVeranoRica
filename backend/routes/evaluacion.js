const express = require('express');
const router = express.Router();
const evaluacionController = require('../controllers/evaluacionController');

router.post('/', evaluacionController.guardarEvaluacion);

module.exports = router;
