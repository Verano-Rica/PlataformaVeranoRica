// backend/routes/Admin/seleccionados.js
const express = require('express');
const router = express.Router();
const db = require('../../db');

// Obtener TODOS los usuarios seleccionados
// Obtener usuarios seleccionados
router.get('/', (req, res) => {
  const sql = `
    SELECT us.*, 
           a1.nombre AS nombre_area_formulario, 
           a2.nombre AS nombre_area_final
    FROM usuarios_seleccionados us
    LEFT JOIN areas a1 ON us.area_id = a1.id
    LEFT JOIN areas a2 ON us.area_final_id = a2.id
    ORDER BY us.fecha_registro DESC
  `;
  db.query(sql, (err, resultados) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener datos' });
    res.json(resultados);
  });
});
// Obtener un usuario seleccionado por ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const sql = `
    SELECT us.*, 
           a1.nombre AS nombre_area_formulario, 
           a2.nombre AS nombre_area_final
    FROM usuarios_seleccionados us
    LEFT JOIN areas a1 ON us.area_id = a1.id
    LEFT JOIN areas a2 ON us.area_final_id = a2.id
    WHERE us.id_usuario = ?
  `;
  db.query(sql, [id], (err, resultados) => {
    if (err || resultados.length === 0) {
      return res.status(500).json({ mensaje: 'Error al obtener usuario' });
    }
    res.json(resultados[0]);
  });
});


// Actualizar datos del usuario seleccionado (área final, subárea, proyecto y estado)
router.put('/actualizar/:id_usuario', (req, res) => {
  const { area_final_id, subarea_especifica, proyecto_asignado_final, estado_seleccion } = req.body;
  const { id_usuario } = req.params;

  const actualizarSeleccionado = `
    UPDATE usuarios_seleccionados
    SET area_final_id = ?, subarea_especifica = ?, proyecto_asignado_final = ?, estado_seleccion = ?
    WHERE id_usuario = ?
  `;

  const actualizarUsuario = `
    UPDATE usuarios SET estado_proceso = ? WHERE id = ?
  `;

  db.query(actualizarSeleccionado, [area_final_id, subarea_especifica, proyecto_asignado_final, estado_seleccion, id_usuario], (err1) => {
    if (err1) return res.status(500).json({ mensaje: 'Error al actualizar seleccionados' });

    db.query(actualizarUsuario, [estado_seleccion, id_usuario], (err2) => {
      if (err2) return res.status(500).json({ mensaje: 'Error al actualizar usuarios' });
      res.json({ mensaje: 'Usuario actualizado correctamente' });
    });
  });
});



module.exports = router;
