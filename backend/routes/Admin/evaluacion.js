const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/', (req, res) => {
  const {
    id_usuario, motivacion, habilidades, softwares, certificaciones, domicilio,
    transporte, vision_5_anos, disponibilidad_horaria, area_interes_entrevista,
    detalles_adicionales, nivel_comunicacion, experiencia_destacada,
    nivel_expresion_oral, actitud, nivel_idioma, observaciones, recomendacion
  } = req.body;

  const query = `
    INSERT INTO evaluaciones_entrevista (
      id_usuario, motivacion, habilidades, softwares, certificaciones, domicilio,
      transporte, vision_5_anos, disponibilidad_horaria, area_interes_entrevista,
      detalles_adicionales, nivel_comunicacion, experiencia_destacada,
      nivel_expresion_oral, actitud, nivel_idioma, observaciones, recomendacion
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    id_usuario, motivacion, habilidades, softwares, certificaciones, domicilio,
    transporte, vision_5_anos, disponibilidad_horaria, area_interes_entrevista,
    detalles_adicionales, nivel_comunicacion, experiencia_destacada,
    nivel_expresion_oral, actitud, nivel_idioma, observaciones, recomendacion
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al guardar evaluación:', err);
      return res.status(500).json({ mensaje: 'Error interno' });
    }
    res.json({ mensaje: 'Evaluación guardada correctamente' });
  });
});

module.exports = router;
