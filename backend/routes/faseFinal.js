const express = require('express');
const router = express.Router();
const faseFinalController = require('../controllers/faseFinalController');

router.get('/:id', faseFinalController.obtenerFaseFinal);
router.post('/guardar', faseFinalController.guardarFaseFinal);

module.exports = router;

