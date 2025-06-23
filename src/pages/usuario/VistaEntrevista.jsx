import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import '../../styles/usuarioPanel.css';
import '../../styles/formulario.css'; // Usamos el mismo estilo que el formulario

import { FaCheck, FaCalendarAlt, FaMapMarkerAlt, FaProjectDiagram, FaFilePdf, FaClock } from 'react-icons/fa';

const proyectosDisponibles = [
  'Desarrollo Web', 'Relaciones Laborales', 'Control de Calidad',
  'Innovación de Productos', 'Sustentabilidad', 'Finanzas Rurales',
  'Logística', 'Automatización'
];

const bloques = [
  { id: 1, etiqueta: "9:00 AM - 11:00 AM" },
  { id: 2, etiqueta: "11:00 AM - 1:00 PM" },
  { id: 3, etiqueta: "3:00 PM - 5:00 PM" },
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
  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const handleLogout = () => (window.location.href = '/');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, cvFile: e.target.files[0] }));
  };

  const handleAgendar = (e) => {
    e.preventDefault();
    const { proyecto1, proyecto2, fecha, bloque, cvFile } = formData;

    if (!proyecto1 || !proyecto2 || !fecha || !bloque || !cvFile) {
      setMensaje('⚠️ Por favor completa todos los campos y adjunta tu CV.');
      return;
    }

    const bloqueTexto = bloques.find(b => b.id === parseInt(bloque))?.etiqueta || '';
    setMensaje(`✅ Entrevista agendada para el ${fecha} en el horario ${bloqueTexto}.\nProyecto 1: ${proyecto1}\nProyecto 2: ${proyecto2}\nCV adjunto: ${cvFile.name}`);
  };

  return (
    <div className={`panel-container ${menuAbierto ? 'menu-activo' : ''}`}>
      <Sidebar />
      <div className="panel-contenido">
        <Header nombre="Bienvenido(a): Larisa Moreno Zamora" toggleMenu={toggleMenu} handleLogout={handleLogout} />

        <main className="main-contenido">
          <div className="formulario-container">
            <div className="formulario-header">
              <h2 style={{ color: '#b51818', fontWeight: 'bold' }}>
                <FaCalendarAlt style={{ marginRight: '10px' }} />
                Agenda tu Entrevista
              </h2>
            </div>

            <div style={{ marginBottom: '25px', paddingLeft: '10px', color: '#444' }}>
              <p><FaCheck style={{ color: 'green' }} /> <strong>Hora de entrada:</strong> 9:00 a.m.</p>
              <p><FaCalendarAlt style={{ color: '#b51818' }} /> <strong>Fecha de la entrevista:</strong> Lunes 8 de junio</p>
              <p><FaMapMarkerAlt style={{ color: '#d00000' }} /> <strong>Ubicación:</strong><br />
                Camino a Pozos Téllez Km. 1.5<br />
                Fracc. Industrial La Reforma<br />
                42080 Pachuca, Hgo.</p>
              <p>Nos emociona recibirte y arrancar esta gran experiencia contigo.</p>
            </div>

            <form className="formulario-form" onSubmit={handleAgendar}>
              {/* Proyecto 1 */}
              <div className="campo-formulario">
                <div className="campo-etiqueta">
                  <FaProjectDiagram className="campo-icono" />
                  <span className="campo-titulo">Primer Proyecto</span>
                </div>
                <select name="proyecto1" value={formData.proyecto1} onChange={handleChange} className="campo-input">
                  <option value="">Selecciona tu primer proyecto</option>
                  {proyectosDisponibles.map((p, i) => (
                    <option key={i} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              {/* Proyecto 2 */}
              <div className="campo-formulario">
                <div className="campo-etiqueta">
                  <FaProjectDiagram className="campo-icono" />
                  <span className="campo-titulo">Segundo Proyecto</span>
                </div>
                <select name="proyecto2" value={formData.proyecto2} onChange={handleChange} className="campo-input">
                  <option value="">Selecciona tu segundo proyecto</option>
                  {proyectosDisponibles.map((p, i) => (
                    <option key={i} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              {/* Otro proyecto */}
              <div className="campo-formulario">
                <div className="campo-etiqueta">
                  <FaProjectDiagram className="campo-icono" />
                  <span className="campo-titulo">¿Otro proyecto? (opcional)</span>
                </div>
                <textarea
                  name="otroProyecto"
                  value={formData.otroProyecto}
                  onChange={handleChange}
                  className="campo-input"
                  placeholder="Escribe otro proyecto que te gustaría proponer"
                />
              </div>

              {/* Fecha */}
              <div className="campo-formulario">
                <div className="campo-etiqueta">
                  <FaCalendarAlt className="campo-icono" />
                  <span className="campo-titulo">Fecha</span>
                </div>
                <input
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  className="campo-input"
                />
              </div>

              {/* Bloque horario */}
              <div className="campo-formulario">
                <div className="campo-etiqueta">
                  <FaClock className="campo-icono" />
                  <span className="campo-titulo">Bloque horario</span>
                </div>
                <select name="bloque" value={formData.bloque} onChange={handleChange} className="campo-input">
                  <option value="">Selecciona un horario</option>
                  {bloques.map(b => (
                    <option key={b.id} value={b.id}>{b.etiqueta}</option>
                  ))}
                </select>
              </div>

              {/* CV */}
              <div className="campo-formulario">
                <div className="campo-etiqueta">
                  <FaFilePdf className="campo-icono" />
                  <span className="campo-titulo">Adjuntar CV (PDF)</span>
                </div>
                <input type="file" accept=".pdf" onChange={handleFileChange} className="campo-input" />
              </div>

              <button type="submit" className="boton-formulario">Agendar Entrevista</button>
            </form>

            {mensaje && <p className="mensaje" style={{ whiteSpace: 'pre-line', marginTop: '20px', color: 'green', fontWeight: 'bold' }}>{mensaje}</p>}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default VistaEntrevista;
