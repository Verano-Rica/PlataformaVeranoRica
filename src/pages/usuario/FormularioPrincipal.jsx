import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser, FaUniversity, FaGraduationCap, FaBook, FaEnvelope,
  FaPhoneAlt, FaBriefcase, FaHome, FaArrowCircleRight, FaCheckCircle, FaTimesCircle
} from 'react-icons/fa';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BotonRedondo from '../../components/BotonRedondo';

import logoBienvenida from '../../assets/icono-bienvenida.png';
import logoRica from '../../assets/logo-rica.png';

import '../../styles/usuarioPanel.css';
import '../../styles/formulario.css';

const FormularioPrincipal = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [areas, setAreas] = useState([]);
  const [formData, setFormData] = useState({
    universidad: '',
    carrera: '',
    semestre: '',
    telefono: '',
    area_id: '',
    otra_area_interes: ''
  });

  const [mostrarOtroArea, setMostrarOtroArea] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');
  const [mostrarToast, setMostrarToast] = useState(false);
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem('usuario')) || {};
  const nombreCompleto = `${usuario.nombre_usuario || usuario.nombre || ''} ${usuario.apellido_paterno || ''} ${usuario.apellido_materno || ''}`.trim();

  useEffect(() => {
    fetch('http://localhost:3001/api/areas')
      .then(res => res.json())
      .then(data => setAreas(data))
      .catch(err => console.error('Error al obtener áreas:', err));
  }, []);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatearTelefono = (valor) => {
    const numeros = valor.replace(/\D/g, '').slice(0, 10);
    return numeros.replace(/(\d{3})(\d{3})(\d{0,4})/, (_, a, b, c) => c ? `${a}-${b}-${c}` : `${a}-${b}`);
  };

  const handleTelefonoChange = (e) => {
    const valorFormateado = formatearTelefono(e.target.value);
    setFormData({ ...formData, telefono: valorFormateado });
  };

  const handleAreaChange = (e) => {
    const valor = e.target.value;
    setFormData({ ...formData, area_id: valor });
    setMostrarOtroArea(parseInt(valor) === 10); // 'Otro'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id_usuario = parseInt(localStorage.getItem('userId'), 10);
    const area_id = parseInt(formData.area_id, 10);
    const semestre = parseInt(formData.semestre, 10);

    if (isNaN(id_usuario)) {
      setTipoMensaje('error');
      setMensaje('No se ha podido identificar al usuario.');
      setMostrarToast(true);
      return;
    }

    if (!formData.universidad || !formData.carrera || !semestre || !formData.telefono || !area_id) {
      setTipoMensaje('error');
      setMensaje('Por favor completa todos los campos obligatorios.');
      setMostrarToast(true);
      return;
    }

    const datosLimpios = {
      id_usuario,
      universidad: formData.universidad,
      carrera: formData.carrera,
      semestre,
      telefono: formData.telefono.replace(/\D/g, ''),
      area_id,
      otra_area_interes: mostrarOtroArea ? formData.otra_area_interes : null
    };

    try {
      const response = await fetch('http://localhost:3001/api/formulario/guardar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosLimpios)
      });

      const data = await response.json();
      setTipoMensaje(response.ok ? 'exito' : 'error');
      setMensaje(data.mensaje);
      setMostrarToast(true);

      if (response.ok) {
        setTimeout(() => navigate('/usuario/proyectos'), 2000);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setTipoMensaje('error');
      setMensaje('Hubo un error al enviar el formulario');
      setMostrarToast(true);
    }
  };

  return (
    <div className={`panel-container ${menuAbierto ? 'menu-activo' : ''}`}>
      <Sidebar menuAbierto={menuAbierto} toggleMenu={toggleMenu} />
      <div className="panel-contenido">
        <Header
          nombre={
            <span className="titulo-header-unido">
              <span className="programa-normal">Programa </span>
              <span className="verano-negritas">VERANO RICA</span>
            </span>
          }
          toggleMenu={toggleMenu}
          handleLogout={handleLogout}
        />

        <main className="main-contenido">
          <div className="formulario-container">
            <header className="formulario-header">
              <img src={logoBienvenida} alt="Logo Bienvenida" className="formulario-logo" />
            </header>

            <form className="formulario-form" onSubmit={handleSubmit}>
              {/* Datos no editables */}
              <div className="campo-formulario">
                <div className="campo-etiqueta">
                  <FaUser className="campo-icono" />
                  <span className="campo-titulo">Nombre completo</span>
                </div>
                <input
                  type="text"
                  value={nombreCompleto}
                  readOnly
                  className="campo-input"
                />
              </div>

              <div className="campo-formulario">
                <div className="campo-etiqueta">
                  <FaEnvelope className="campo-icono" />
                  <span className="campo-titulo">Correo electrónico</span>
                </div>
                <input
                  type="email"
                  value={usuario.correo}
                  readOnly
                  className="campo-input"
                />
              </div>

              {/* Campos editables */}
              <div className="campo-formulario">
                <div className="campo-etiqueta">
                  <FaUniversity className="campo-icono" />
                  <span className="campo-titulo">Universidad</span>
                </div>
                <input
                  type="text"
                  name="universidad"
                  value={formData.universidad}
                  onChange={handleChange}
                  className="campo-input"
                  placeholder="Escribe tu universidad"
                />
              </div>

              <div className="campo-formulario">
                <div className="campo-etiqueta">
                  <FaGraduationCap className="campo-icono" />
                  <span className="campo-titulo">Carrera</span>
                </div>
                <input
                  type="text"
                  name="carrera"
                  value={formData.carrera}
                  onChange={handleChange}
                  className="campo-input"
                  placeholder="Escribe tu carrera"
                />
              </div>

              <div className="campo-formulario">
                <div className="campo-etiqueta">
                  <FaBook className="campo-icono" />
                  <span className="campo-titulo">Semestre</span>
                </div>
                <input
                  type="number"
                  name="semestre"
                  min="1"
                  max="12"
                  value={formData.semestre}
                  onChange={handleChange}
                  className="campo-input"
                  placeholder="Del 1 al 12"
                />
              </div>

              <div className="campo-formulario">
                <div className="campo-etiqueta">
                  <FaPhoneAlt className="campo-icono" />
                  <span className="campo-titulo">Número telefónico</span>
                </div>
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleTelefonoChange}
                  className="campo-input"
                  placeholder="Ej: 772-123-4567"
                />
              </div>

              <div className="campo-formulario">
                <div className="campo-etiqueta">
                  <FaBriefcase className="campo-icono" />
                  <span className="campo-titulo">Área a desempeñar</span>
                </div>
                <select
                  name="area_id"
                  value={formData.area_id}
                  onChange={handleAreaChange}
                  className="campo-input"
                >
                  <option value="">Selecciona un área</option>
                  {areas.map(area => (
                    <option key={area.id} value={area.id}>
                      {area.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {mostrarOtroArea && (
                <div className="campo-formulario">
                  <div className="campo-etiqueta">
                    <FaBriefcase className="campo-icono" />
                    <span className="campo-titulo">Otra área de interés</span>
                  </div>
                  <input
                    type="text"
                    name="otra_area_interes"
                    value={formData.otra_area_interes}
                    onChange={handleChange}
                    className="campo-input"
                    placeholder="Especifica tu área deseada"
                  />
                </div>
              )}

              <button type="submit" className="boton-formulario">Guardar información</button>

              <div className="contenedor-logo-form">
                <img src={logoRica} alt="Logo Rica" className="logo-rica-form" />
              </div>
            </form>
          </div>

          {mostrarToast && (
            <div className="overlay-toast">
              <div className="toast-modal">
                <div className="icono-check">
                  {tipoMensaje === 'exito' ? (
                    <FaCheckCircle style={{ color: '#28a745', fontSize: '40px' }} />
                  ) : (
                    <FaTimesCircle style={{ color: '#dc3545', fontSize: '40px' }} />
                  )}
                </div>
                <h3>{mensaje}</h3>
                <button className="cerrar-btn" onClick={() => setMostrarToast(false)}>Cerrar</button>
              </div>
            </div>
          )}

          <div className="iconos-body">
            <div className="home-body-centrado">
              <BotonRedondo icono={<FaHome />} ariaLabel="Inicio" onClick={() => navigate('/usuario')} />
            </div>
            <div className="flecha-body-derecha">
              <BotonRedondo icono={<FaArrowCircleRight />} ariaLabel="Siguiente" onClick={() => navigate('/usuario/proyectos')} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default FormularioPrincipal;
