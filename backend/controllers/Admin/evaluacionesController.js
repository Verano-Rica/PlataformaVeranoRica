const db = require('../../db');

exports.obtenerEvaluaciones = (req, res) => {
  const query = `
    SELECT e.id, e.id_usuario, u.nombre, u.apellido_paterno, u.apellido_materno, u.correo,
           e.motivacion, e.habilidades, e.softwares, e.certificaciones,
           e.disponibilidad_horaria, e.nivel_idiomas, e.actitud, e.recomendacion
    FROM evaluaciones e
    JOIN usuarios u ON u.id = e.id_usuario
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener evaluaciones:', err);
      return res.status(500).json({ error: 'Error al obtener evaluaciones' });
    }
    res.json(results);
  });
};
