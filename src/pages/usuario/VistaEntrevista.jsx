import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import BotonRedondo from '../../components/BotonRedondo';
import iconoBienvenida from '../../assets/icono-bienvenida.png';



import '../../styles/botonRedondo.css';
import '../../styles/entrevista.css';

import {
  FaCalendarAlt,
  FaProjectDiagram,
  FaClock,
  FaFilePdf,
  FaRegFileAlt,
  FaHome,
  FaArrowCircleRight,
  FaCheckCircle,
  FaTimesCircle, FaArrowCircleLeft
} from 'react-icons/fa';

const proyectosDisponibles = [
  'Desarrollo Web', 'Relaciones Laborales', 'Control de Calidad',
  'Innovación de Productos', 'Sustentabilidad', 'Finanzas Rurales',
  'Logística', 'Automatización'
];

const bloques = [
  { id: 1, etiqueta: "9:00 AM - 11:00 AM" },
  { id: 2, etiqueta: "11:00 AM - 1:00 PM" },
  { id: 4, etiqueta: "5:00 PM - 6:00 PM" }
];

const VistaEntrevista = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [formData, setFormData] = useState({
    proyecto1: '',
    proyecto2: '',
    otroProyecto: '',
    fecha: '',
    bloque: '',
    cvFile: null
  });

  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');
  const [mostrarToast, setMostrarToast] = useState(false);

  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario')) || {};
  const nombre = usuario.nombre || 'Usuario';

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const handleLogout = () => (window.location.href = '/');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, cvFile: e.target.files[0] }));
  };

  const handleAgendar = async (e) => {
    e.preventDefault();
    const { proyecto1, proyecto2, otroProyecto, fecha, bloque, cvFile } = formData;

    if (!proyecto1 || !fecha || !bloque || !cvFile) {
      setTipoMensaje('error');
      setMensaje('Por favor completa los campos y adjunta tu CV');
      setMostrarToast(true);
      return;
    }

    const bloqueTexto = bloques.find(b => b.id === parseInt(bloque))?.etiqueta || '';
    const id_usuario = localStorage.getItem('userId');

    const formDataToSend = new FormData();
    formDataToSend.append('id_usuario', id_usuario);
    formDataToSend.append('proyecto1', proyecto1);
    formDataToSend.append('proyecto2', proyecto2);
    formDataToSend.append('otro_proyecto', otroProyecto);
    formDataToSend.append('fecha_entrevista', fecha);
    formDataToSend.append('bloque_id', bloque);
    formDataToSend.append('nombre_bloque', bloqueTexto);
    formDataToSend.append('cvFile', cvFile);

    try {
      const res = await fetch('http://localhost:3001/api/entrevista/agendar', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await res.json();

      if (!res.ok) {
  setTipoMensaje('error');
  setMensaje(data?.error || data?.mensaje || 'Entrevista ya agendada');
  setMostrarToast(true);
  return;
}


      setTipoMensaje('exito');
      setMensaje('Entrevista agendada correctamente');
      setMostrarToast(true);

    } catch (err) {
      console.error(err);
      setTipoMensaje('error');
      setMensaje('Error al conectar con el servidor. Inténtalo más tarde.');
      setMostrarToast(true);
    }
  };

  return (
    <div className={`panel-container ${menuAbierto ? 'menu-activo' : ''}`}>
      <Sidebar />
      <div className="panel-contenido">
     <Header
  nombre={
    <span className="titulo-header-unido">
      <span className="programa-normal">Programa </span>
      <span className="verano-negritas">VERANO RICA</span>
    </span>
  }

/>


        <main className="main-contenido">
          <div className="contenedor-encabezado-bienvenida">
            <img src={iconoBienvenida} alt="Bienvenida" className="pastilla-bienvenida" />
          </div>

          <div className="formulario-container">
            <form className="formulario-form" onSubmit={handleAgendar}>
              <div className="titulo-entrevista">
                <FaCalendarAlt className="icono-entrevista" />
                <span className="texto-entrevista">Agenda tu entrevista:</span>
              </div>

              {/* Paso 1 */}
              <div className="formulario-paso">
                <div className="formulario-numero">1</div>
                <div style={{ flex: 1 }}>
                  <div className="campo-formulario">
                    <div className="campo-etiqueta">
                      <FaCalendarAlt className="campo-icono" />
                      <span className="campo-titulo">Fecha *</span>
                    </div>
                    <select
                      name="fecha"
                      value={formData.fecha}
                      onChange={handleChange}
                      className="campo-input"
                    >
                      <option value="">Selecciona la fecha</option>
                      <option value="2026-05-25">Lunes 25 de mayo de 2026</option>
                    </select>
                  </div>

                  <div className="campo-formulario">
                    <div className="campo-etiqueta">
                      <FaClock className="campo-icono" />
                      <span className="campo-titulo">Horario *</span>
                    </div>
                    <select
                      name="bloque"
                      value={formData.bloque}
                      onChange={handleChange}
                      className="campo-input"
                    >
                      <option value="">Selecciona un horario</option>
                      {bloques.map(b => (
                        <option key={b.id} value={b.id}>{b.etiqueta}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Paso 2 */}
              <div className="formulario-paso">
                <div className="formulario-numero">2</div>
                <div style={{ flex: 1 }}>
                  <div className="campo-formulario">
                    <div className="campo-etiqueta">
                      <FaRegFileAlt className="campo-icono" />
                      <span className="campo-titulo">Primer Proyecto *</span>
                    </div>
                    <select
                      name="proyecto1"
                      value={formData.proyecto1}
                      onChange={handleChange}
                      className="campo-input"
                    >
                      <option value="">Selecciona tu primer proyecto</option>
                      {proyectosDisponibles.map((p, i) => (
                        <option key={i} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div className="campo-formulario">
                    <div className="campo-etiqueta">
                      <FaRegFileAlt className="campo-icono" />
                      <span className="campo-titulo">Segundo Proyecto (opcional)</span>
                    </div>
                    <select
                      name="proyecto2"
                      value={formData.proyecto2}
                      onChange={handleChange}
                      className="campo-input"
                    >
                      <option value="">Selecciona tu segundo proyecto</option>
                      {proyectosDisponibles.map((p, i) => (
                        <option key={i} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div className="campo-formulario">
                    <div className="campo-etiqueta">
                      <FaRegFileAlt className="campo-icono" />
                      <span className="campo-titulo">Proponer Proyecto (opcional)</span>
                    </div>
                    <textarea
                      name="otroProyecto"
                      value={formData.otroProyecto}
                      onChange={handleChange}
                      className="campo-input"
                      placeholder="Propuesta libre"
                    />
                  </div>
                </div>
              </div>

              {/* Paso 3 */}
              <div className="formulario-paso">
                <div className="formulario-numero">3</div>
                <div style={{ flex: 1 }}>
                  <div className="campo-formulario">
                    <div className="campo-etiqueta">
                      <FaFilePdf className="campo-icono" />
                      <span className="campo-titulo">Subir tu CV (PDF) *</span>
                    </div>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="campo-input"
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="boton-formulario">CONTINUAR</button>
            </form>
          </div>

          {/* Modal visual con icono y botón */}
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
                <button className="cerrar-btn" onClick={() => setMostrarToast(false)}>
                  Cerrar
                </button>
              </div>
            </div>
          )}

          {/* Navegación inferior */}
          <div className="iconos-body">
                      <div className="home-body-anterior">
              <BotonRedondo icono={<FaArrowCircleLeft />} ariaLabel="Inicio" onClick={() => navigate('/usuario/proyectos')} />
            </div>
            <div className="home-body-centrado">
              <BotonRedondo icono={<FaHome />} ariaLabel="Inicio" onClick={() => navigate('/usuario')} />
            </div>
            <div className="flecha-body-derecha">
              <BotonRedondo icono={<FaArrowCircleRight />} ariaLabel="Siguiente" onClick={() => navigate('/usuario/resultados')} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default VistaEntrevista;
