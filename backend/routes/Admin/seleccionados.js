const express = require('express');
const router = express.Router();
const {
  obtenerSeleccionadoPorId,
  actualizarSeleccion,
  obtenerTodosSeleccionados // ← este es nuevo
} = require('../../controllers/Admin/seleccionadosController');

router.get('/', obtenerTodosSeleccionados); // ← agrega esta línea
router.get('/:id', obtenerSeleccionadoPorId);
router.put('/actualizar/:id', actualizarSeleccion);

module.exports = router;
