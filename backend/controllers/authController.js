require('dotenv').config();
const db = require('../db');
const axios = require('axios');

// ----------------------------------------
// REGISTRO DE USUARIOS (trabajadores)
// ----------------------------------------
const register = (req, res) => {
  const { nombre, apellido_paterno, apellido_materno, correo, contraseña } = req.body;

  const query = `
    INSERT INTO usuarios (nombre, apellido_paterno, apellido_materno, correo, contraseña)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [nombre, apellido_paterno, apellido_materno, correo, contraseña], (err, result) => {
    if (err) {
      console.error('Error al registrar usuario:', err);
      return res.status(500).json({ error: 'Error al registrar usuario' });
    }

    const newUser = {
      id: result.insertId,
      nombre,
      apellido_paterno,
      apellido_materno,
      correo,
      rol: 2
    };

    res.status(200).json({ message: 'Usuario registrado exitosamente', user: newUser });
  });
};

// ----------------------------------------
// LOGIN CON VERIFICACIÓN DE CAPTCHA
// ----------------------------------------
const login = async (req, res) => {
  const { correo, contraseña, token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token de captcha no enviado' });
  }

  try {
    // Verificar reCAPTCHA con Google
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

    // ---------------------
    // Buscar en administradores
    // ---------------------
    const adminQuery = 'SELECT * FROM administradores WHERE correo = ? AND contraseña = ?';
    db.query(adminQuery, [correo, contraseña], (err, adminResults) => {
      if (err) return res.status(500).json({ error: 'Error al buscar administrador' });

      if (adminResults.length > 0) {
        const admin = adminResults[0];
        return res.status(200).json({
          message: 'Inicio como administrador',
          tipo: 'admin',
          user: {
            id: admin.id,
            nombre_admin: admin.nombre,
            correo: admin.correo
          }
        });
      }

      // ---------------------
      // Buscar en usuarios
      // ---------------------
      const userQuery = 'SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?';
      db.query(userQuery, [correo, contraseña], (err, userResults) => {
        if (err) return res.status(500).json({ error: 'Error al buscar usuario' });

        if (userResults.length > 0) {
          const user = userResults[0];
          return res.status(200).json({
            message: 'Inicio como usuario',
            tipo: 'usuario',
            user: {
              id: user.id,
              nombre_usuario: user.nombre,
              correo: user.correo,
              estado: user.estado_proceso
            }
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

// ----------------------------------------
// CONSULTAR ESTADO DE USUARIO
// ----------------------------------------
const obtenerEstadoUsuario = (req, res) => {
  const { correo } = req.query;

  const query = 'SELECT nombre, estado_proceso AS estado FROM usuarios WHERE correo = ?';
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

module.exports = {
  register,
  login,
  obtenerEstadoUsuario
};
