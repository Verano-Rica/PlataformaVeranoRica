import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUserCircle, FaCog, FaQuestionCircle, FaBars,
  FaUser, FaUniversity, FaGraduationCap, FaBook,
  FaEnvelope, FaPhoneAlt, FaBriefcase, FaHome, FaArrowCircleRight
} from 'react-icons/fa';
import '../../styles/usuarioPanel.css';
import '../../styles/formulario.css';
import avatar from '../../assets/avatar.png';
import logoBienvenida from '../../assets/icono-bienvenida.png';
import logoRica from '../../assets/logo-rica.png';

const FormularioPrincipal = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mostrarOtroArea, setMostrarOtroArea] = useState(false);

  const nombre = 'Bienvenido(a): Larisa Moreno Zamora';
  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const handleLogout = () => (window.location.href = '/');

  const [formData, setFormData] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    universidad: '',
    carrera: '',
    semestre: '',
    correo: '',
    telefono: '',
    area_id: '',
    otra_area_interes: ''
  });

  const areas = [
    { id: 1, nombre: 'Tecnologías de la Información', abreviatura: 'TI' },
    { id: 2, nombre: 'Cadena de suministro', abreviatura: 'CSUM' },
    { id: 3, nombre: 'Recursos Humanos', abreviatura: 'RH' },
    { id: 4, nombre: 'Finanzas', abreviatura: 'FIN' },
    { id: 5, nombre: 'Data Analystics', abreviatura: 'DA' },
    { id: 6, nombre: 'Otro', abreviatura: 'OTR' }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatearTelefono = (valor) => {
    const numeros = valor.replace(/\D/g, '').slice(0, 10);
    const formato = numeros.replace(/(\d{3})(\d{3})(\d{0,4})/, (_, a, b, c) =>
      c ? `${a}-${b}-${c}` : `${a}-${b}`
    );
    return formato;
  };

  const handleTelefonoChange = (e) => {
    const valorFormateado = formatearTelefono(e.target.value);
    setFormData({ ...formData, telefono: valorFormateado });
  };

  const handleAreaChange = (e) => {
    const valor = e.target.value;
    setFormData({ ...formData, area_id: valor });
    setMostrarOtroArea(valor === '6');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datosLimpios = {
      ...formData,
      telefono: formData.telefono.replace(/\D/g, '')
    };

    try {
      const response = await fetch('http://localhost:3001/api/formulario/guardar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosLimpios)
      });
      const data = await response.json();
      alert(data.mensaje);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Hubo un error al enviar el formulario');
    }
  };

  return (
    <div className={`panel-container ${menuAbierto ? 'menu-activo' : ''}`}>
      <div className="sidebar">
        <div className="menu-opciones">
          <Link to="/usuario/perfil"><div className="account-circle-icon-1"><FaUserCircle /></div>Perfil</Link>
          <Link to="/usuario/configuracion"><div className="account-circle-icon-1"><FaCog /></div>Configuración</Link>
          <Link to="/usuario/ayuda"><div className="help-outline-icon-1"><FaQuestionCircle /></div>Ayuda</Link>
        </div>
      </div>

      <div className="panel-contenido">
        <header className="header">
          <div className="usuario-info">
            <button className="hamburguesa-header" onClick={toggleMenu}><FaBars /></button>
            <img src={avatar} alt="Avatar" className="avatar" />
            <span className="nombre-usuario">{nombre}</span>
          </div>
          <button className="cerrar-sesion" onClick={handleLogout}>Cerrar sesión</button>
        </header>

        <main className="main-contenido">
          <div className="formulario-container">
            <header className="formulario-header">
              <img src={logoBienvenida} alt="Logo Bienvenida" className="formulario-logo" />
            </header>

            <form className="formulario-form" onSubmit={handleSubmit}>
              {[ 
                { name: 'nombre', label: 'Nombre(s)', icon: FaUser },
                { name: 'apellido_paterno', label: 'Apellido Paterno', icon: FaUser },
                { name: 'apellido_materno', label: 'Apellido Materno', icon: FaUser },
                { name: 'universidad', label: 'Universidad', icon: FaUniversity },
                { name: 'carrera', label: 'Carrera', icon: FaGraduationCap },
                { name: 'correo', label: 'Correo electrónico', icon: FaEnvelope, type: 'email' },
              ].map((campo, i) => (
                <div className="campo-formulario" key={i}>
                  <div className="campo-etiqueta">
                    <campo.icon className="campo-icono" />
                    <span className="campo-titulo">{campo.label}</span>
                  </div>
                  <input
                    type={campo.type || 'text'}
                    name={campo.name}
                    value={formData[campo.name]}
                    onChange={handleChange}
                    className="campo-input alineado-derecha"
                    placeholder={`Escribe tu ${campo.label.toLowerCase()}`}
                  />
                </div>
              ))}

              {/* Teléfono */}
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
                  className="campo-input alineado-derecha"
                  placeholder="xxx-xxx-xxxx"
                />
              </div>

              {/* Semestre */}
              <div className="campo-formulario">
                <div className="campo-etiqueta">
                  <FaBook className="campo-icono" />
                  <span className="campo-titulo">Semestre</span>
                </div>
                <select
                  name="semestre"
                  value={formData.semestre}
                  onChange={handleChange}
                  className="campo-input"
                >
                  <option value="">Selecciona un semestre</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              {/* Área */}
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
                      {area.nombre} ({area.abreviatura})
                    </option>
                  ))}
                </select>
              </div>

              {/* Otra área */}
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

          <div className="iconos-body">
            <div className="home-body-centrado">
              <FaHome className="icono-body" />
            </div>
            <div className="flecha-body-derecha">
              <FaArrowCircleRight className="icono-body" />
            </div>
          </div>
        </main>

        <footer className="footer">
          <p>&copy; 2026 Experiencia Verano RICA · Todos los derechos reservados</p>
        </footer>
      </div>
    </div>
  );
};

export default FormularioPrincipal;
