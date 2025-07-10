const express = require('express');
const router = express.Router();
const faseFinalController = require('../controllers/faseFinalController');
const multer = require('multer');
const path = require('path');

// Configurar almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/fase_final'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

// ⚠️ Middleware seguro que no falla si no hay archivos
const safeUpload = upload.fields([
  { name: 'ine' },
  { name: 'curp' },
  { name: 'acta' },
  { name: 'comprobante_domicilio' }
]);

// Ruta para obtener los datos por ID de usuario
router.get('/:id', faseFinalController.obtenerFaseFinal);

// Ruta para guardar documentos (Fase 1) o talla (Fase 2)
router.post('/guardar', (req, res, next) => {
  safeUpload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: 'Error de subida de archivos' });
    } else if (err) {
      return res.status(500).json({ error: 'Error desconocido en multer' });
    }
    next();
  });
}, faseFinalController.guardarFaseFinal);

// Ruta para guardar disponibilidad (Fase 3)
router.post('/disponibilidad', faseFinalController.guardarDisponibilidad);

//  Ruta para obtener TODOS los datos completos de fase final
// router.get('/datos/completos', faseFinalController.obtenerFaseFinalCompleta);
router.get('/vista/completa', faseFinalController.obtenerVistaFaseFinalCompleta);



module.exports = router;
