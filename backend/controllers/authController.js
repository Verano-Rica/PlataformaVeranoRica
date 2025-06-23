require('dotenv').config(); //  Asegúrate de que esté al principio
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

  // Validar que el CAPTCHA esté presente
  if (!token) {
    return res.status(400).json({ error: 'Token de captcha no enviado' });
  }

  try {
    // ✅ Verificar el token con Google reCAPTCHA
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

    // 👉 Si el captcha es válido, seguimos con el login

    // Primero buscar en administradores
    const adminQuery = 'SELECT * FROM administradores WHERE correo = ? AND contraseña = ?';
    db.query(adminQuery, [correo, contraseña], (err, adminResults) => {
      if (err) return res.status(500).json({ error: 'Error al buscar administrador' });

      if (adminResults.length > 0) {
        return res.status(200).json({ message: 'Inicio como administrador', user: adminResults[0], tipo: 'admin' });
      }

      // Si no es admin, buscar en usuarios
      const userQuery = 'SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?';
      db.query(userQuery, [correo, contraseña], (err, userResults) => {
        if (err) return res.status(500).json({ error: 'Error al buscar usuario' });

        if (userResults.length > 0) {
          return res.status(200).json({ message: 'Inicio como trabajador', user: userResults[0], tipo: 'trabajador' });
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

module.exports = { register, login };
