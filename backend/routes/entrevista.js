// backend/routes/entrevista.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { agendarEntrevista } = require('../controllers/entrevistaController');

// Configuración de almacenamiento segura
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    cb(null, Date.now() + '_' + safeName);
  }
});

// Validación de solo PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') cb(null, true);
  else cb(new Error('Solo se permiten archivos PDF'), false);
};

const upload = multer({ storage, fileFilter });

// Ruta que usa multer y controlador
router.post('/agendar', upload.single('cvFile'), agendarEntrevista);

module.exports = router;
