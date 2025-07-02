const db = require('../../db');

// Buscar postulantes con entrevista (por nombre)
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

// Obtener evaluación individual
exports.obtenerEvaluacionPorUsuario = (req, res) => {
  const id = req.params.id;
  const query = `
    SELECT * FROM evaluaciones WHERE id_usuario = ?
  `;
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener evaluación' });
    if (results.length === 0) return res.status(404).json({ message: 'No hay evaluación registrada' });
    res.json(results[0]);
  });
};

// Guardar evaluación RH con validación
exports.guardarEvaluacion = (req, res) => {
  const {
    id_usuario,
    motivacion,
    habilidades,
    softwares,
    certificaciones,
    domicilio,
    transporte,
    disponibilidad_horaria,
    vision_5_anios,
    nivel_idiomas,
    detalles_adicionales,
    experiencia_destacada,
    nivel_expresion,
    actitud,
    observaciones,
    recomendacion
  } = req.body;

  // Validación básica de campos obligatorios
  if (!id_usuario || !motivacion || !habilidades || !actitud || !recomendacion) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const query = `
    INSERT INTO evaluaciones (
      id_usuario, motivacion, habilidades, softwares, certificaciones,
      domicilio, transporte, disponibilidad_horaria, vision_5_anios,
      nivel_idiomas, detalles_adicionales, experiencia_destacada,
      nivel_expresion, actitud, observaciones, recomendacion
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const valores = [
    id_usuario, motivacion, habilidades, softwares, certificaciones,
    domicilio, transporte, disponibilidad_horaria, vision_5_anios,
    nivel_idiomas, detalles_adicionales, experiencia_destacada,
    nivel_expresion, actitud, observaciones, recomendacion
  ];

  db.query(query, valores, (err, result) => {
    if (err) {
      console.error('❌ Error al guardar la evaluación:', err);
      return res.status(500).json({ error: 'Error al guardar la evaluación' });
    }
    res.status(200).json({ message: 'Evaluación guardada correctamente' });
  });
};
