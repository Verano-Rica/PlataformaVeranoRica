require('dotenv').config();
const db = require('../db');
const axios = require('axios');

// Registro solo para trabajadores (usuarios)
const register = (req, res) => {
  const { nombre, correo, contraseña } = req.body;
  const query = 'INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)';
  db.query(query, [nombre, correo, contraseña], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al registrar usuario' });
    }
    res.status(200).json({ message: 'Usuario registrado exitosamente' });
  });
};

// Login con verificación de CAPTCHA
const login = async (req, res) => {
  const { correo, contraseña, token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token de captcha no enviado' });
  }

  try {
    const captchaResponse = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: process.env.SITE_SECRET,
          response: token,
        },
      }
    );

    if (!captchaResponse.data.success) {
      return res.status(400).json({ error: 'Captcha inválido' });
    }

    const adminQuery = 'SELECT * FROM administradores WHERE correo = ? AND contraseña = ?';
    db.query(adminQuery, [correo, contraseña], (err, adminResults) => {
      if (err) return res.status(500).json({ error: 'Error al buscar administrador' });

      if (adminResults.length > 0) {
        return res.status(200).json({
          message: 'Inicio como administrador',
          user: adminResults[0],
          tipo: 'admin'
        });
      }

      const userQuery = 'SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?';
      db.query(userQuery, [correo, contraseña], (err, userResults) => {
        if (err) return res.status(500).json({ error: 'Error al buscar usuario' });

        if (userResults.length > 0) {
          return res.status(200).json({
            message: 'Inicio como trabajador',
            user: userResults[0],
            tipo: 'trabajador'
          });
        } else {
          return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
      });
    });
  } catch (error) {
    console.error('Error al verificar captcha:', error);
    return res.status(500).json({ error: 'Error al verificar captcha' });
  }
};

// ✅ Obtener el estado del usuario
const obtenerEstadoUsuario = (req, res) => {
  const { correo } = req.query;

  const query = 'SELECT nombre, estado FROM usuarios WHERE correo = ?';
  db.query(query, [correo], (err, results) => {
    if (err) {
      console.error('Error al obtener estado:', err);
      return res.status(500).json({ error: 'Error del servidor' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.status(200).json(results[0]); // { nombre, estado }
  });
};

module.exports = { register, login, obtenerEstadoUsuario };
