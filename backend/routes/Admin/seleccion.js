const express = require('express');
const router = express.Router();
const controller = require('../../controllers/Admin/seleccionController');

router.get('/', controller.obtenerUsuariosAceptados);
router.post('/asignar/:id_usuario', controller.guardarAsignacionFinal); // 👈 CORRECTO

module.exports = router;
