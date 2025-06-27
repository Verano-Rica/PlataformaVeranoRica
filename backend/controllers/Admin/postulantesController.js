const db = require('../../db');

const obtenerPostulantes = (req, res) => {
  const query = `
    SELECT 
      id_usuario, nombre, apellido_paterno, apellido_materno,
      universidad, carrera, semestre, correo, telefono,
      area_id, otra_area_interes, proyecto1, proyecto2,
      otro_proyecto, cv_nombre
    FROM usuarios_seleccionados
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener postulantes:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.json(results);
  });
};

module.exports = { obtenerPostulantes };
