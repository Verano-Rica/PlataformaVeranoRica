const db = require('../db');

// Obtener datos de fase final por usuario
exports.obtenerFaseFinal = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM fase_final_confirmacion WHERE id_usuario = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al obtener datos de fase final:', err);
      return res.status(500).json({ error: 'Error al consultar' });
    }
    res.json(result[0]);
  });
};

// Guardar documentos (Fase 1) o talla (Fase 2)
exports.guardarFaseFinal = (req, res) => {
  const { id_usuario } = req.body;
  const archivos = req.files || {};
  const talla_playera = req.body.talla_playera || null;

  const ine_nombre = archivos.ine?.[0]?.filename || '';
  const curp_nombre = archivos.curp?.[0]?.filename || '';
  const acta_nombre = archivos.acta?.[0]?.filename || '';
  const comprobante_domicilio_nombre = archivos.comprobante_domicilio?.[0]?.filename || '';

  // 👉 CASO 1: Solo guardar TALLA (Fase 2)
  if (talla_playera && !ine_nombre && !curp_nombre && !acta_nombre && !comprobante_domicilio_nombre) {
    const query = `
      UPDATE fase_final_confirmacion
      SET talla_playera = ?
      WHERE id_usuario = ?
    `;
    db.query(query, [talla_playera, id_usuario], (err) => {
      if (err) {
        console.error('Error al guardar talla:', err);
        return res.status(500).json({ error: 'Error al guardar talla' });
      }

      const updateEstado = 'UPDATE usuarios SET estado_proceso = ? WHERE id = ?';
      db.query(updateEstado, [6, id_usuario], (err2) => {
        if (err2) {
          console.error('Error al actualizar estado_proceso:', err2);
          return res.status(500).json({ error: 'Talla guardada, pero falló actualización de estado' });
        }
        return res.json({ message: 'Talla guardada correctamente' });
      });
    });
    return;
  }

  // 👉 CASO 2: Guardar documentos (Fase 1)
  if (!ine_nombre && !curp_nombre && !acta_nombre && !comprobante_domicilio_nombre) {
    return res.status(400).json({ error: 'No se subió ningún documento ni talla' });
  }

  const query = `
    INSERT INTO fase_final_confirmacion (
      id_usuario, ine_nombre, curp_nombre, acta_nombre, comprobante_domicilio_nombre
    )
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      ine_nombre = VALUES(ine_nombre),
      curp_nombre = VALUES(curp_nombre),
      acta_nombre = VALUES(acta_nombre),
      comprobante_domicilio_nombre = VALUES(comprobante_domicilio_nombre)
  `;

  db.query(
    query,
    [id_usuario, ine_nombre, curp_nombre, acta_nombre, comprobante_domicilio_nombre],
    (err) => {
      if (err) {
        console.error('Error al guardar documentos de fase 1:', err);
        return res.status(500).json({ error: 'Error al guardar documentos' });
      }

      const updateEstado = 'UPDATE usuarios SET estado_proceso = ? WHERE id = ?';
      db.query(updateEstado, [5, id_usuario], (err2) => {
        if (err2) {
          console.error('Error al actualizar estado_proceso:', err2);
          return res.status(500).json({ error: 'Guardado, pero falló estado_proceso' });
        }

        res.json({ message: 'Documentos de Fase 1 guardados correctamente' });
      });
    }
  );
};

// Guardar o actualizar disponibilidad de fase 3
exports.guardarDisponibilidad = (req, res) => {
  const { id_usuario, disponibilidad_general } = req.body;

  if (!disponibilidad_general) {
    return res.status(400).json({ error: 'Debe indicar su disponibilidad' });
  }

  const query = `
    UPDATE fase_final_confirmacion 
    SET disponibilidad_general = ? 
    WHERE id_usuario = ?
  `;

  db.query(query, [disponibilidad_general, id_usuario], (err) => {
    if (err) {
      console.error('Error al guardar disponibilidad:', err);
      return res.status(500).json({ error: 'Error al guardar disponibilidad' });
    }

    const updateEstado = 'UPDATE usuarios SET estado_proceso = ? WHERE id = ?';
    db.query(updateEstado, [7, id_usuario], (err2) => {
      if (err2) {
        console.error('Error al actualizar estado_proceso a 7:', err2);
        return res.status(500).json({ error: 'Guardado pero falló estado' });
      }

      res.json({ message: 'Disponibilidad guardada correctamente' });
    });
  });
};
//Obtener vista final
exports.obtenerVistaFaseFinalCompleta = (req, res) => {
  const query = 'SELECT * FROM vista_fase_final_completa';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al consultar la vista completa:', err);
      return res.status(500).json({ error: 'Error al obtener datos completos' });
    }
    res.json(results);
  });
};
