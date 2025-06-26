const express = require('express');
const router = express.Router();
const usuariosAgendadosController = require('../../controllers/Admin/usuariosAgendadosController');

router.get('/usuarios/agendados', usuariosAgendadosController.obtenerUsuariosAgendados);
router.delete('/usuarios/agendados/:id_usuario', usuariosAgendadosController.cancelarEntrevista);

module.exports = router;
