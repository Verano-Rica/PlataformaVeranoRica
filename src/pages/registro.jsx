import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import ricaImg from '../assets/login-image.png';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  const navigate = useNavigate();

  const manejarRegistro = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo, contraseña }),
      });

      const data = await respuesta.json();

      if (data.message) {
        navigate('/inicio-usuario');
      } else {
        setMensaje(' Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      setMensaje(' Error de conexión con el servidor');
    }
  };

  return (
    <div className="container">
      {/* Lado Izquierdo */}
      <div className="left">
        <img src={ricaImg} alt="Grupo Rica" className="full-image" />
      </div>

      {/* Lado Derecho */}
      <form className="right" onSubmit={manejarRegistro}>
        <div className="login-box">
          <h2 className="login-title">📝 Registro</h2>
          <p className="login-subtitle">Crea tu cuenta</p>

          <div className="form-group">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="correo">Correo</label>
            <input
              id="correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contraseña">Contraseña</label>
            <input
              id="contraseña"
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
          </div>

          <button type="submit">Registrarme</button>

          {mensaje && <p style={{ marginTop: '1rem' }}>{mensaje}</p>}
        </div>
      </form>
    </div>
  );
}

export default Registro;
