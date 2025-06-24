import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUserCircle, FaCog, FaQuestionCircle, FaUser, FaUniversity,
  FaGraduationCap, FaBook, FaEnvelope, FaPhoneAlt, FaBriefcase
} from 'react-icons/fa';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BotonRedondo from '../../components/BotonRedondo';
import '../../styles/usuarioPanel.css';
import '../../styles/formulario.css';
import logoBienvenida from '../../assets/icono-bienvenida.png';
import logoRica from '../../assets/logo-rica.png';
import { FaHome, FaArrowRight } from 'react-icons/fa';
import { FaArrowCircleRight } from 'react-icons/fa';


const FormularioPrincipal = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mostrarOtroArea, setMostrarOtroArea] = useState(false);
  const navigate = useNavigate();
  const nombre = 'Larisa Moreno Zamora';

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
      <Sidebar toggleMenu={toggleMenu} />

      <div className="panel-contenido">
        <Header nombre={`Bienvenido(a): ${nombre}`} toggleMenu={toggleMenu} handleLogout={handleLogout} />

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
              // eslint-disable-next-line react/jsx-no-undef
              <BotonRedondo icono={<FaHome />} ariaLabel="Inicio" onClick={() => navigate('/usuario/panel')} />
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
