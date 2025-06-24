const express = require('express');
const router = express.Router();
const db = require('../db'); // Asegúrate que este archivo conecta bien a tu base de datos

// Ruta para aceptar a un usuario
router.post('/aceptar/:id_usuario', (req, res) => {
  const idUsuario = req.params.id_usuario;

  const insertQuery = `
    INSERT INTO usuarios_aceptados (
      id_usuario, nombre, apellido_paterno, apellido_materno,
      universidad, carrera, semestre, correo, telefono,
      area_id, otra_area_interes,
      proyecto1, proyecto2, otro_proyecto, cv_nombre,
      estatus
    )
    SELECT 
      u.id,
      df.nombre, df.apellido_paterno, df.apellido_materno,
      df.universidad, df.carrera, df.semestre, df.correo, df.telefono,
      df.area_id, df.otra_area_interes,
      ea.proyecto1, ea.proyecto2, ea.otro_proyecto, ea.cv_nombre,
      1
    FROM usuarios u
    JOIN datos_formulario df ON u.id = df.id
    JOIN entrevistas_agendadas ea ON u.id = ea.id_usuario
    WHERE u.id = ?
  `;

  db.query(insertQuery, [idUsuario], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Este usuario ya fue aceptado.' });
      }
      return res.status(500).json({ error: 'Error al aceptar al usuario', detalle: err });
    }

    res.status(200).json({ message: 'Usuario aceptado con éxito' });
  });
});

// Ruta para consultar si un usuario fue aceptado
router.get('/estado/:id_usuario', (req, res) => {
  const idUsuario = req.params.id_usuario;

  const query = 'SELECT * FROM usuarios_aceptados WHERE id_usuario = ?';

  db.query(query, [idUsuario], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al verificar estado del usuario' });
    }

    if (result.length > 0) {
      // Usuario fue aceptado
      res.status(200).json({
        estado: 'aceptado',
        datos: result[0] // puedes usar los datos si quieres mostrar nombre, etc.
      });
    } else {
      // Usuario no fue aceptado
      res.status(200).json({
        estado: 'rechazado'
      });
    }
  });
});

module.exports = router;
