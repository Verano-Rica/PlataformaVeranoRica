const db = require('../../db');

const obtenerPostulantes = (req, res) => {
  const query = `
    SELECT 
      u.id AS id_usuario,
      u.nombre,
      u.apellido_paterno,
      u.apellido_materno,
      df.universidad,
      df.carrera,
      df.semestre,
      u.correo,
      df.telefono,
      df.area_id,
      a.nombre AS nombre_area,
      df.otra_area_interes,
      ea.proyecto1,
      ea.proyecto2,
      ea.otro_proyecto,
      ea.cv_nombre
    FROM usuarios u
    JOIN datos_formulario df ON u.id = df.id_usuario
    JOIN entrevistas_agendadas ea ON u.id = ea.id_usuario
    JOIN areas a ON df.area_id = a.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener postulantes:', err);
      return res.status(500).json({ error: 'Error al obtener postulantes' });
    }
    res.json(results);
  });
};

module.exports = { obtenerPostulantes };
