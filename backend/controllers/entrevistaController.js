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

  const queryUsuario = 'SELECT nombre, apellido_paterno FROM usuarios WHERE id = ?';
  db.query(queryUsuario, [id_usuario], (err, results) => {
    if (err || results.length === 0) {
      console.error('Error al obtener usuario:', err);
      return res.status(500).json({ error: 'No se pudo obtener usuario' });
    }

    const { nombre, apellido_paterno } = results[0];
    const extension = path.extname(req.file.originalname);
    const nuevoNombreArchivo = `${nombre}${apellido_paterno}CV${extension}`.replace(/\s+/g, '').toLowerCase();

    const rutaActual = req.file.path;
    const nuevaRuta = path.join(req.file.destination, nuevoNombreArchivo);

    fs.rename(rutaActual, nuevaRuta, (renameErr) => {
      if (renameErr) {
        console.error('Error al renombrar archivo:', renameErr);
        return res.status(500).json({ error: 'Error al guardar archivo' });
      }

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

  if (insertErr.code === 'ER_DUP_ENTRY') {
    return res.status(400).json({ error: 'Entrevista ya agendada' });
  }
  return res.status(500).json({ error: 'Error al agendar entrevista' });
}



        const updateEstado = 'UPDATE usuarios SET estado_proceso = 2 WHERE id = ?';
        db.query(updateEstado, [id_usuario], (estadoErr) => {
          if (estadoErr) {
            console.error('Error al actualizar estado_proceso:', estadoErr);
            return res.status(500).json({ mensaje: 'Entrevista guardada pero falló actualización de estado' });
          }

          const verificar = 'SELECT id FROM usuarios_seleccionados WHERE id_usuario = ?';
          db.query(verificar, [id_usuario], (errVer, rows) => {
            if (errVer) {
              console.error('Error al verificar usuarios_seleccionados:', errVer);
              return res.status(500).json({ mensaje: 'Entrevista guardada pero falló verificación de seleccionados' });
            }

            if (rows.length > 0) {
              return res.status(200).json({
                mensaje: 'Entrevista agendada. Usuario ya estaba en seleccionados.',
                archivo: nuevoNombreArchivo
              });
            }

            // CORREGIDO: columnas movidas de df. a u.
            const insertarSeleccionado = `
              INSERT INTO usuarios_seleccionados (
                id_usuario, nombre, apellido_paterno, apellido_materno,
                universidad, carrera, semestre, correo, telefono,
                area_id, otra_area_interes,
                proyecto1, proyecto2, otro_proyecto, cv_nombre,
                estado_seleccion
              )
              SELECT 
                u.id, u.nombre, u.apellido_paterno, u.apellido_materno,
                df.universidad, df.carrera, df.semestre, u.correo, df.telefono,
                df.area_id, df.otra_area_interes,
                ea.proyecto1, ea.proyecto2, ea.otro_proyecto, ea.cv_nombre,
                2
              FROM usuarios u
              JOIN datos_formulario df ON u.id = df.id_usuario
              JOIN entrevistas_agendadas ea ON u.id = ea.id_usuario
              WHERE u.id = ?
            `;

            db.query(insertarSeleccionado, [id_usuario], (errInsert) => {
              if (errInsert) {
                console.error('Error al insertar en seleccionados:', errInsert);
                return res.status(500).json({ mensaje: 'Entrevista guardada pero falló inserción en seleccionados' });
              }

              res.status(200).json({
                mensaje: 'Entrevista agendada y usuario registrado en seleccionados',
                archivo: nuevoNombreArchivo
              });
            });
          });
        });
      });
    });
  });
};

module.exports = { agendarEntrevista };
