import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import '../styles/login.css';
import ricaImg from '../assets/login-image.png';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [esExitoso, setEsExitoso] = useState(false);
  const [captchaValido, setCaptchaValido] = useState(false);
  const [tokenCaptcha, setTokenCaptcha] = useState('');

  const navigate = useNavigate();

  const siteKey = process.env.REACT_APP_SITE_KEY;

  const manejarCaptcha = (token) => {
    setCaptchaValido(true);
    setTokenCaptcha(token);
  };

  const manejarLogin = async (e) => {
    e.preventDefault();

    if (!captchaValido) {
      <center>setMensaje('Por favor completa el captcha.'); </center>
      setEsExitoso(false);
      return;
    } 

    try {
      const respuesta = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contraseña, token: tokenCaptcha }),
      });

      const data = await respuesta.json();

      if (data.user) {
        const nombre = data.user.nombre_admin || data.user.nombre_usuario;
        const rol = data.tipo === 'admin' ? 'Administrador' : 'Usuario';

        {/*setMensaje(`Bienvenido ${rol}: ${nombre}`);*/}
        localStorage.setItem('correoUsuario', data.user.correo);
        localStorage.setItem('nombreUsuario', nombre);
        localStorage.setItem('rolUsuario', rol); // opcional

        setEsExitoso(true);

        setTimeout(() => {
          if (data.tipo === 'admin') {
            navigate('/admin');
          } else {
            navigate('/usuario');
          }
        }, 1500);
      } else {
        setMensaje('Credenciales incorrectas');
        setEsExitoso(false);
      }
    } catch (error) {
      console.error('Error en login:', error);
      setMensaje('Error al conectar con el servidor');
      setEsExitoso(false);
    }
  };

  return (
    <div className="container">
      {/* Lado Izquierdo */}
      <div className="left">
        <img src={ricaImg} alt="Grupo Rica" className="full-image" />
      </div>

      {/* Lado Derecho */}
      <div className="right">
        <form className="login-box" onSubmit={manejarLogin}>
          <h2 className="login-title">Bienvenido</h2>
          <p className="login-subtitle">Ingresa</p>

          <div className="form-group">
            <label htmlFor="correo">Ingresa tu correo</label>
            <input
              id="correo"
              type="email"
              placeholder="ejemplo@correo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="clave">Ingresa tu contraseña</label>
            <input
              id="clave"
              type="password"
              placeholder="********"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
          </div>

          {/* Captcha visible */}
          <div className="form-group recaptcha-container">
          <ReCAPTCHA
          sitekey={siteKey}
          onChange={manejarCaptcha}/>
          </div>

          <button type="submit">Entrar</button>

          {mensaje && (
            <p
              style={{
                marginTop: '1rem',
                color: esExitoso ? 'green' : 'red',
                fontWeight: esExitoso ? 'bold' : 'normal',
              }}
            >
              {mensaje}
            </p>
          )}

          <p className="register">
            ¿Aún no tienes una cuenta?{' '}
            <a href="/registro">Regístrate</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
