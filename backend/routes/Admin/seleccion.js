const express = require('express');
const router = express.Router();
const db = require('../../db');

// INSERTAR un usuario a la tabla usuarios_seleccionados
router.post('/insertar/:id_usuario', (req, res) => {
  const id = req.params.id_usuario;

  const query = `
    INSERT INTO usuarios_seleccionados (
      id_usuario, nombre, apellido_paterno, apellido_materno,
      universidad, carrera, semestre, correo, telefono,
      area_id, otra_area_interes, proyecto1, proyecto2,
      otro_proyecto, cv_nombre, estatus, estado_proceso
    )
    SELECT 
      u.id, df.nombre, df.apellido_paterno, df.apellido_materno,
      df.universidad, df.carrera, df.semestre, df.correo, df.telefono,
      df.area_id, df.otra_area_interes, ea.proyecto1, ea.proyecto2,
      ea.otro_proyecto, ea.cv_nombre, 1, 4
    FROM usuarios u
    JOIN datos_formulario df ON u.id = df.id
    JOIN entrevistas_agendadas ea ON u.id = ea.id_usuario
    WHERE u.id = ?
  `;

  db.query(query, [id], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ mensaje: 'Ya existe ese usuario en seleccionados' });
      }
      return res.status(500).json({ mensaje: 'Error al insertar usuario', error: err });
    }
    res.status(200).json({ mensaje: 'Usuario agregado a selección correctamente' });
  });
});

// OBTENER todos los usuarios seleccionados
router.get('/', (req, res) => {
  const query = `
    SELECT 
      ua.id_usuario,
      ua.nombre,
      ua.apellido_paterno,
      ua.apellido_materno,
      ua.universidad,
      ua.carrera,
      ua.semestre,
      ua.correo,
      ua.telefono,
      ua.area_id,
      a.nombre AS nombre_area_formulario,
      ua.otra_area_interes,
      ua.proyecto1,
      ua.proyecto2,
      ua.otro_proyecto,
      ua.cv_nombre,
      ua.area_final_id,
      ua.subarea_especifica,
      ua.proyecto_asignado_final,
      ua.estado_proceso
    FROM usuarios_seleccionados ua
    LEFT JOIN areas a ON ua.area_id = a.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios seleccionados:', err);
      return res.status(500).json({ error: 'Error al obtener usuarios seleccionados' });
    }
    res.json(results);
  });
});

// ACTUALIZAR decisión final y asignación
router.put('/actualizar/:id_usuario', (req, res) => {
  const id = req.params.id_usuario;
  const {
    area_final_id,
    subarea_especifica,
    proyecto_asignado_final,
    estado_seleccion // 4 = aceptado, 9 = rechazado
  } = req.body;

  const query = `
    UPDATE usuarios_seleccionados
    SET 
      area_final_id = ?,
      subarea_especifica = ?,
      proyecto_asignado_final = ?,
      estado_proceso = ?
    WHERE id_usuario = ?
  `;

  db.query(
    query,
    [area_final_id, subarea_especifica, proyecto_asignado_final, estado_seleccion, id],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar usuario seleccionado:', err);
        return res.status(500).json({ mensaje: 'Error al actualizar usuario', error: err });
      }
      res.json({ mensaje: 'Usuario actualizado correctamente' });
    }
  );
});

module.exports = router;
