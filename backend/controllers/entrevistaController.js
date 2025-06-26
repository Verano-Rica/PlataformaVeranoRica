const db = require('../db');
const fs = require('fs');
const path = require('path');

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

  console.log('ID recibido:', id_usuario);
  console.log('Archivo recibido:', req.file);

  if (!req.file) {
    return res.status(400).json({ error: 'Archivo CV no recibido' });
  }

  // Obtener nombre y apellido desde la tabla usuarios
  const queryUsuario = 'SELECT nombre, apellido_paterno FROM usuarios WHERE id = ?';
  db.query(queryUsuario, [id_usuario], (err, results) => {
    if (err || results.length === 0) {
      console.error('Error al obtener usuario:', err);
      return res.status(500).json({ error: 'No se pudo obtener usuario' });
    }

    const { nombre, apellido_paterno } = results[0];
    const extension = path.extname(req.file.originalname);
    const nuevoNombreArchivo = `${nombre}${apellido_paterno}CV${extension}`
      .replace(/\s+/g, '')
      .toLowerCase();

    const rutaActual = req.file.path;
    const nuevaRuta = path.join(req.file.destination, nuevoNombreArchivo);

    // Renombrar archivo
    fs.rename(rutaActual, nuevaRuta, (renameErr) => {
      if (renameErr) {
        console.error('Error al renombrar archivo:', renameErr);
        return res.status(500).json({ error: 'Error al guardar archivo' });
      }

      // Insertar entrevista
      const insertQuery = `
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
        nuevoNombreArchivo
      ];

      db.query(insertQuery, valores, (insertErr) => {
        if (insertErr) {
          console.error('Error al guardar entrevista:', insertErr);
          return res.status(500).json({ error: 'Error al agendar entrevista' });
        }

        // ✅ Actualizar estado_proceso a FASE 2
        const updateEstado = 'UPDATE usuarios SET estado_proceso = 2 WHERE id = ?';
        db.query(updateEstado, [id_usuario], (estadoErr) => {
          if (estadoErr) {
            console.error('Error al actualizar estado_proceso:', estadoErr);
            return res.status(500).json({ mensaje: 'Entrevista guardada pero falló actualización de estado' });
          }

          res.status(200).json({ mensaje: 'Entrevista agendada y estado actualizado a FASE 2', archivo: nuevoNombreArchivo });
        });
      });
    });
  });
};

module.exports = { agendarEntrevista };
