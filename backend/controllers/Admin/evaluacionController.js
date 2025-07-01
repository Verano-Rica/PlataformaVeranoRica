const db = require('../db');

exports.guardarEvaluacion = (req, res) => {
  const {
    id_usuario,
    motivacion,
    habilidades,
    softwares,
    certificaciones,
    domicilio,
    transporte,
    vision_5_anos,
    disponibilidad_horaria,
    area_interes_entrevista,
    detalles_adicionales,
    nivel_comunicacion,
    experiencia_destacada,
    nivel_expresion_oral,
    actitud,
    nivel_idioma,
    observaciones,
    recomendacion
  } = req.body;

  const verificarQuery = 'SELECT * FROM entrevistas_agendadas WHERE id_usuario = ?';
  db.query(verificarQuery, [id_usuario], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al verificar entrevista' });
    if (results.length === 0) return res.status(400).json({ error: 'Este usuario no tiene entrevista agendada' });

    const insertQuery = `
      INSERT INTO evaluaciones_entrevista (
        id_usuario, motivacion, habilidades, softwares, certificaciones, domicilio, transporte,
        vision_5_anos, disponibilidad_horaria, area_interes_entrevista, detalles_adicionales,
        nivel_comunicacion, experiencia_destacada, nivel_expresion_oral, actitud, nivel_idioma,
        observaciones, recomendacion
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [
      id_usuario, motivacion, habilidades, softwares, certificaciones, domicilio, transporte,
      vision_5_anos, disponibilidad_horaria, area_interes_entrevista, detalles_adicionales,
      nivel_comunicacion, experiencia_destacada, nivel_expresion_oral, actitud, nivel_idioma,
      observaciones, recomendacion
    ];

    db.query(insertQuery, valores, (err) => {
      if (err) {
        console.error('Error al guardar evaluación:', err);
        return res.status(500).json({ error: 'Error al guardar evaluación' });
      }
      res.json({ mensaje: 'Evaluación guardada correctamente' });
    });
  });
};
