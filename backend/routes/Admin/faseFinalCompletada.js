const express = require('express');
const router = express.Router();
const controller = require('../../controllers/Admin/faseFinalCompletadaController');

router.get('/', controller.obtenerUsuariosFaseFinalCompletada);

module.exports = router;
