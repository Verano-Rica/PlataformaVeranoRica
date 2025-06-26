// backend/routes/Admin/usuarios.js
const express = require('express');
const router = express.Router();
const { obtenerTodosLosUsuarios } = require('../../controllers/Admin/UsuariosController');

router.get('/todos', obtenerTodosLosUsuarios);

module.exports = router;
