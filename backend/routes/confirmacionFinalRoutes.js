// backend/routes/confirmacionFinalRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../db');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/confirmacion_final/');
  },
  filename: (req, file, cb) => {
    const nombreUnico = Date.now() + '-' + file.originalname;
    cb(null, nombreUnico);
  },
});

const upload = multer({ storage });

const campos = [
  { name: 'ine' },
  { name: 'rfc' },
  { name: 'curp' },
  { name: 'acta' },
  { name: 'comprobanteEstudios' },
  { name: 'comprobanteDomicilio' },
];

router.post('/', upload.fields(campos), (req, res) => {
  const id_usuario = req.body.id_usuario || req.headers['id_usuario'];
  const talla = req.body.talla;
  const disponible = req.body.disponible === 'true';
  const evaluaciones = req.body.evaluaciones === 'true';

  const archivos = req.files;

  const query = `
    INSERT INTO fase_final_confirmacion (
      id_usuario, talla_playera, ine_nombre, rfc_nombre, curp_nombre,
      acta_nombre, comprobante_estudios_nombre, comprobante_domicilio_nombre,
      disponible_inicio, disponible_fin, evaluaciones_completadas
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      talla_playera = VALUES(talla_playera),
      ine_nombre = VALUES(ine_nombre),
      rfc_nombre = VALUES(rfc_nombre),
      curp_nombre = VALUES(curp_nombre),
      acta_nombre = VALUES(acta_nombre),
      comprobante_estudios_nombre = VALUES(comprobante_estudios_nombre),
      comprobante_domicilio_nombre = VALUES(comprobante_domicilio_nombre),
      disponible_inicio = VALUES(disponible_inicio),
      disponible_fin = VALUES(disponible_fin),
      evaluaciones_completadas = VALUES(evaluaciones_completadas);
  `;

  const values = [
    id_usuario,
    talla,
    archivos.ine?.[0]?.filename || null,
    archivos.rfc?.[0]?.filename || null,
    archivos.curp?.[0]?.filename || null,
    archivos.acta?.[0]?.filename || null,
    archivos.comprobanteEstudios?.[0]?.filename || null,
    archivos.comprobanteDomicilio?.[0]?.filename || null,
    '2025-06-02',
    '2025-07-25',
    evaluaciones,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al guardar confirmación final:', err);
      return res.status(500).json({ success: false, mensaje: 'Error del servidor' });
    }

    // Actualizar estado_proceso
    const updateEstado = 'UPDATE usuarios SET estado_proceso = 5 WHERE id = ?';
    db.query(updateEstado, [id_usuario], (err2) => {
      if (err2) {
        console.error('Error al actualizar estado:', err2);
        return res.status(500).json({ success: false, mensaje: 'Error al actualizar estado' });
      }

      res.json({ success: true });
    });
  });
});

module.exports = router;
