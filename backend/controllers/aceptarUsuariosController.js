// backend/controllers/aceptarUsuariosController.js
const db = require('../db');

// ✅ Obtener estado de aceptación por ID de usuario
const obtenerEstadoAceptacion = (req, res) => {
  const id_usuario = req.params.id;

  const query = `
    SELECT us.*, a.nombre AS nombre_area_final
    FROM usuarios_seleccionados us
    LEFT JOIN areas a ON us.area_final_id = a.id
    WHERE us.id_usuario = ?;
  `;

  db.query(query, [id_usuario], (err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error en la base de datos' });

    if (resultados.length === 0) {
      return res.json({ estado: 'pendiente' });
    }

    const datos = resultados[0];

    const estado = datos.estado_seleccion === 4
      ? 'aceptado'
      : datos.estado_seleccion === 9
      ? 'rechazado'
      : 'pendiente';

    res.json({ estado, datos });
  });
};

module.exports = {
  obtenerEstadoAceptacion
};
