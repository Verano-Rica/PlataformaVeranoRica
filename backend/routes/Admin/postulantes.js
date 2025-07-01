const express = require('express');
const router = express.Router();
const { obtenerPostulantes } = require('../../controllers/Admin/postulantesController');

router.get('/', obtenerPostulantes);

module.exports = router;
