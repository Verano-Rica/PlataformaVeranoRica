// routes/entrevista.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const entrevistaController = require('../controllers/entrevistaController');
const path = require('path');

// Configuración de almacenamiento básica (sin renombrar aquí)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Asegúrate de que esta carpeta exista
  },
  filename: function (req, file, cb) {
    const originalName = `${Date.now()}_${file.originalname}`;
    cb(null, originalName);
  }
});

const upload = multer({ storage });

// Ruta POST para agendar entrevista con subida de CV
router.post('/agendar', upload.single('cvFile'), entrevistaController.agendarEntrevista);

module.exports = router;
