// routes/entrevista.js
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const entrevistaController = require('../controllers/entrevistaController');

// Configurar almacenamiento con nomenclatura personalizada
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb( 'uploads/');
  },
  filename: function (req, file, cb) {
    const nombre = req.body.nombre || 'usuario';
    const apellido = req.body.apellido_paterno || '';
    const ext = path.extname(file.originalname); // .pdf

    const nombreFinal = `${nombre}${apellido}CV${ext}`.replace(/\s+/g, '');
    cb(nombreFinal.toLowerCase());
  }
});

const upload = multer({ storage });

// Ruta POST para agendar entrevista
router.post('/agendar', upload.single('cvFile'), entrevistaController.agendarEntrevista);

module.exports = router;
