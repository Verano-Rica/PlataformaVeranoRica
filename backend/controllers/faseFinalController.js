const db = require('../db');

// Obtener datos por usuario
exports.obtenerFaseFinal = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM fase_final_confirmacion WHERE id_usuario = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al obtener fase final:', err);
      return res.status(500).json({ error: 'Error al consultar' });
    }
    res.json(result[0]);
  });
};

// Guardar o actualizar datos
exports.guardarFaseFinal = (req, res) => {
  const {
    id_usuario,
    talla_playera,
    ine_nombre,
    curp_nombre,
    acta_nombre,
    rfc_nombre,
    comprobante_estudios_nombre,
    comprobante_domicilio_nombre,
    disponible_inicio,
    disponible_fin,
    evaluaciones_completadas
  } = req.body;

  // Determinar fase según campos llenos
  let nuevaFase = 4; // Por defecto
  if (evaluaciones_completadas) nuevaFase = 8;
  else if (disponible_inicio && disponible_fin) nuevaFase = 7;
  else if (talla_playera) nuevaFase = 6;
  else if (ine_nombre || curp_nombre || acta_nombre) nuevaFase = 5;

  const query = `
    INSERT INTO fase_final_confirmacion (
      id_usuario, talla_playera, ine_nombre, curp_nombre, acta_nombre,
      rfc_nombre, comprobante_estudios_nombre, comprobante_domicilio_nombre,
      disponible_inicio, disponible_fin, evaluaciones_completadas
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      talla_playera = VALUES(talla_playera),
      ine_nombre = VALUES(ine_nombre),
      curp_nombre = VALUES(curp_nombre),
      acta_nombre = VALUES(acta_nombre),
      rfc_nombre = VALUES(rfc_nombre),
      comprobante_estudios_nombre = VALUES(comprobante_estudios_nombre),
      comprobante_domicilio_nombre = VALUES(comprobante_domicilio_nombre),
      disponible_inicio = VALUES(disponible_inicio),
      disponible_fin = VALUES(disponible_fin),
      evaluaciones_completadas = VALUES(evaluaciones_completadas)
  `;

  db.query(
    query,
    [
      id_usuario,
      talla_playera,
      ine_nombre,
      curp_nombre,
      acta_nombre,
      rfc_nombre,
      comprobante_estudios_nombre,
      comprobante_domicilio_nombre,
      disponible_inicio,
      disponible_fin,
      evaluaciones_completadas
    ],
    (err, result) => {
      if (err) {
        console.error('Error al guardar fase final:', err);
        return res.status(500).json({ error: 'Error al guardar datos' });
      }

      // Actualizar estado_proceso
      const updateQuery = 'UPDATE usuarios SET estado_proceso = ? WHERE id = ?';
      db.query(updateQuery, [nuevaFase, id_usuario], (err2) => {
        if (err2) {
          console.error('Error al actualizar estado_proceso:', err2);
          return res.status(500).json({ error: 'Datos guardados pero falló actualización de estado' });
        }

        res.json({ message: 'Datos de fase final guardados correctamente y estado actualizado' });
      });
    }
  );
};
