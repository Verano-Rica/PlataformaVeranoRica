const db = require('../../db');

exports.obtenerEvaluacionPorUsuario = (req, res) => {
  const idUsuario = req.params.id;

  const query = `
    SELECT e.*, u.nombre, u.apellido_paterno, u.apellido_materno, u.correo, u.telefono, 
           f.universidad, f.carrera, a.nombre AS nombre_area
    FROM evaluaciones e
    JOIN usuarios u ON u.id = e.id_usuario
    LEFT JOIN datos_formulario f ON f.id_usuario = u.id
    LEFT JOIN areas a ON a.id = f.area_id
    WHERE e.id_usuario = ?
  `;

  db.query(query, [idUsuario], (err, results) => {
    if (err) {
      console.error('Error al obtener evaluación:', err);
      return res.status(500).json({ error: 'Error del servidor' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Evaluación no encontrada' });
    }

    const r = results[0];
    res.json({
      postulante: {
        nombre: `${r.nombre} ${r.apellido_paterno} ${r.apellido_materno}`,
        correo: r.correo,
        telefono: r.telefono,
        universidad: r.universidad,
        carrera: r.carrera,
        area: r.nombre_area
      },
      evaluacion: {
        motivacion: r.motivacion,
        habilidades: r.habilidades,
        softwares: r.softwares,
        certificaciones: r.certificaciones,
        disponibilidad: r.disponibilidad,
        actitud: r.actitud,
        recomendacion: r.recomendacion,
        vision_5_años: r.vision_5_años,
        idiomas: r.idiomas,
        detalles_adicionales: r.detalles_adicionales,
        expresion_oral: r.expresion_oral,
        logros: r.logros,
        experiencia_destacada: r.experiencia_destacada
      }
    });
  });
};
