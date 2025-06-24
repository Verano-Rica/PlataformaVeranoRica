// backend/controllers/entrevistaController.js
const db = require('../db');

const agendarEntrevista = (req, res) => {
  const {
    id_usuario,
    proyecto1,
    proyecto2,
    otro_proyecto,
    fecha_entrevista,
    bloque_id,
    nombre_bloque
  } = req.body;

  const cv_nombre = req.file ? req.file.filename : null;

  if (!cv_nombre) {
    return res.status(400).json({ error: 'Archivo CV no recibido' });
  }

  const query = `
    INSERT INTO entrevistas_agendadas (
      id_usuario, proyecto1, proyecto2, otro_proyecto,
      fecha_entrevista, bloque_id, nombre_bloque, cv_nombre
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const valores = [
    id_usuario,
    proyecto1,
    proyecto2 || null,
    otro_proyecto || null,
    fecha_entrevista,
    bloque_id,
    nombre_bloque,
    cv_nombre
  ];

  db.query(query, valores, (err, result) => {
    if (err) {
      console.error('Error al guardar entrevista:', err);
      return res.status(500).json({ error: 'Error al agendar entrevista' });
    }
    res.status(200).json({ mensaje: 'Entrevista agendada correctamente' });
  });
};

module.exports = { agendarEntrevista };
