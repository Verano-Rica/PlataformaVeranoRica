const db = require('../../db');

exports.obtenerUsuariosFaseFinalCompletada = (req, res) => {
  const query = `
    SELECT 
      u.id AS id_usuario,
      CONCAT(u.nombre, ' ', u.apellido_paterno, ' ', u.apellido_materno) AS nombre_completo,
      u.correo,
      f.ine_postulante,
      f.curp_postulante,
      f.acta_postulante,
      f.comprobante_domicilio_postulante,
      f.talla_playera,
      f.disponibilidad_general,
      f.comentarios_adicionales,
      e.cv_nombre AS cv_archivo
    FROM usuarios u
    JOIN fase_final_confirmacion f ON u.id = f.id_usuario
    LEFT JOIN entrevistas_agendadas e ON u.id = e.id_usuario;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios fase final:', err);
      return res.status(500).json({ error: 'Error al consultar' });
    }
    res.json(results);
  });
};
