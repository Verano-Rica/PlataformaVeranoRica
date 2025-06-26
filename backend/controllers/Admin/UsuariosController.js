// backend/controllers/Admin/UsuariosController.js
const db = require('../../db');

const obtenerTodosLosUsuarios = (req, res) => {
  const query = `
    SELECT id, nombre, apellido_paterno, apellido_materno, correo, estado_proceso
    FROM usuarios
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener usuarios' });
    res.json(results);
  });
};

module.exports = { obtenerTodosLosUsuarios };
