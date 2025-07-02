const db = require('../../db');

// Buscar postulantes con entrevista
exports.buscarPorNombre = (req, res) => {
  const nombre = req.query.nombre || '';
  const query = `
    SELECT u.id, u.nombre, u.apellido_paterno, u.apellido_materno, u.correo,
           ea.fecha_entrevista, ea.nombre_bloque, ea.proyecto1
    FROM entrevistas_agendadas ea
    JOIN usuarios u ON ea.id_usuario = u.id
    WHERE CONCAT(u.nombre, ' ', u.apellido_paterno, ' ', u.apellido_materno) LIKE ?
  `;
  db.query(query, [`%${nombre}%`], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al buscar entrevistas' });
    res.json(results);
  });
};

// Guardar evaluación RH
exports.guardarEvaluacion = (req, res) => {
  const {
    id_usuario, motivacion, habilidades, softwares, certificaciones, domicilio,
    transporte, disponibilidad_horaria, vision_5_anios, nivel_idiomas, detalles_adicionales,
    experiencia_destacada, expresion_oral, actitud, observaciones, recomendacion_final
  } = req.body;

  const query = `
    INSERT INTO evaluaciones (
      id_usuario, motivacion, habilidades, softwares, certificaciones,
      domicilio, transporte, disponibilidad_horaria, vision_5_anios,
      nivel_idiomas, detalles_adicionales, experiencia_destacada,
      expresion_oral, actitud, observaciones, recomendacion_final
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    id_usuario, motivacion, habilidades, softwares, certificaciones,
    domicilio, transporte, disponibilidad_horaria, vision_5_anios,
    nivel_idiomas, detalles_adicionales, experiencia_destacada,
    expresion_oral, actitud, observaciones, recomendacion_final
  ];

  db.query(query, values, (err) => {
    if (err) {
      console.error('Error al guardar evaluación:', err);
      return res.status(500).json({ error: 'Error al guardar evaluación' });
    }
    res.json({ success: true, mensaje: 'Evaluación guardada correctamente' });
  });
};
