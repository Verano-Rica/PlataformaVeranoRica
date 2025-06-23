import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import '../../styles/usuarioPanel.css';
import '../../styles/entrevista.css';

const proyectosDisponibles = [
  'Desarrollo Web',
  'Relaciones Laborales',
  'Control de Calidad',
  'Innovación de Productos',
  'Sustentabilidad',
  'Finanzas Rurales',
  'Logística',
  'Automatización'
];

const bloques = [
  { id: 1, etiqueta: "9:00 AM - 11:00 AM" },
  { id: 2, etiqueta: "11:00 AM - 1:00 PM" },
  { id: 3, etiqueta: "3:00 PM - 5:00 PM" },
  { id: 4, etiqueta: "5:00 PM - 6:00 PM" },
];

const VistaEntrevista = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [proyecto1, setProyecto1] = useState('');
  const [proyecto2, setProyecto2] = useState('');
  const [otroProyecto, setOtroProyecto] = useState('');
  const [fecha, setFecha] = useState('');
  const [bloque, setBloque] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const nombre = 'Bienvenido(a): Larisa Moreno Zamora';
  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const handleLogout = () => (window.location.href = '/');

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleAgendar = () => {
    if (!proyecto1 || !proyecto2 || !fecha || !bloque || !cvFile) {
      setMensaje('⚠️ Por favor completa todos los campos y adjunta tu CV.');
      return;
    }

    const bloqueTexto = bloques.find(b => b.id === parseInt(bloque))?.etiqueta || '';

    setMensaje(`✅ Entrevista agendada para el ${fecha} en el horario ${bloqueTexto}.
    Proyecto 1: ${proyecto1}
    Proyecto 2: ${proyecto2}
    ${otroProyecto ? `Propuesta adicional: ${otroProyecto}` : ''}
    CV adjunto: ${cvFile.name}`);
  };

  return (
    <div className={`panel-container ${menuAbierto ? 'menu-activo' : ''}`}>
      <Sidebar />

      <div className="panel-contenido">
        <Header nombre={nombre} toggleMenu={toggleMenu} handleLogout={handleLogout} />

        <main className="main-contenido">
          <div className="contenedor-entrevista">
            <h2>🕘 AGENDA TU ENTREVISTA:</h2>

            <div className="leyenda-entrevista">
              <p>Queremos compartirte detalles importantes para que estés lista/o:</p>
              <ul>
                <li>✅ <strong>Hora de entrada:</strong> 9:00 a.m.</li>
                <li>📅 <strong>Fecha de la entrevista:</strong> Lunes 8 de junio</li>
                <li>📍 <strong>Ubicación:</strong><br />
                  Camino a Pozos Téllez Km. 1.5<br />
                  Fracc. Industrial La Reforma<br />
                  42080 Pachuca, Hgo.
                </li>
              </ul>
              <p>Nos emociona recibirte y arrancar esta gran experiencia contigo.</p>
            </div>

            <form className="form-entrevista" onSubmit={(e) => e.preventDefault()}>
              <select value={proyecto1} onChange={(e) => setProyecto1(e.target.value)}>
                <option value="">Selecciona tu primer proyecto</option>
                {proyectosDisponibles.map((p, i) => (
                  <option key={i} value={p}>{p}</option>
                ))}
              </select>

              <select value={proyecto2} onChange={(e) => setProyecto2(e.target.value)}>
                <option value="">Selecciona tu segundo proyecto</option>
                {proyectosDisponibles.map((p, i) => (
                  <option key={i} value={p}>{p}</option>
                ))}
              </select>

              <textarea
                placeholder="¿Deseas proponer otro proyecto? Escríbelo aquí (opcional)"
                value={otroProyecto}
                onChange={(e) => setOtroProyecto(e.target.value)}
              />

              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />

              <select value={bloque} onChange={(e) => setBloque(e.target.value)}>
                <option value="">Selecciona un bloque horario</option>
                {bloques.map((b) => (
                  <option key={b.id} value={b.id}>{b.etiqueta}</option>
                ))}
              </select>

              <div className="campo-cv">
                <label htmlFor="cv" className="cv-label">📄 Adjunta tu CV:</label>
                <input
                  type="file"
                  id="cv"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
                <small>(Formato PDF | Tamaño máximo: 5MB)</small>
              </div>

              <button type="button" onClick={handleAgendar}>Agendar Entrevista</button>
              {mensaje && <p className="mensaje">{mensaje}</p>}
            </form>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default VistaEntrevista;
