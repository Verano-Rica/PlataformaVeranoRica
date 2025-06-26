import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/resultados.css';
import logoBienvenida from '../../assets/icono-bienvenida.png';
import { FaCheckCircle, FaCalendarAlt, FaTimesCircle } from 'react-icons/fa';

const VistaResultados = () => {
  const [datos, setDatos] = useState(null);
  const [estado, setEstado] = useState(null);
  const userId = localStorage.getItem('userId');
  const usuario = JSON.parse(localStorage.getItem('usuario')) || {};
  const nombre = usuario.nombre || 'Usuario';

  useEffect(() => {
    fetch(`http://localhost:3001/api/aceptados/estado/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.estado === 'aceptado') {
          setDatos(data.datos);
          setEstado('aceptado');
        } else if (data.estado === 'rechazado') {
          setEstado('rechazado');
        } else {
          setEstado('pendiente');
        }
      })
      .catch(err => {
        console.error('Error al consultar estado:', err);
        setEstado('error');
      });
  }, [userId]);

  // Funciones necesarias para el Header
  const toggleMenu = () => {};
  const handleLogout = () => (window.location.href = '/');

  // Mientras carga
  if (estado === null) {
    return (
      <div className="vista-principal">
        <Header nombre={`Bienvenido(a): ${nombre}`} toggleMenu={toggleMenu} handleLogout={handleLogout} />
        <Sidebar />
        <div className="contenido-vista">
          <div className="card-resultados">
            <h2 className="titulo-seccion">Cargando resultado...</h2>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Rechazado
  if (estado === 'rechazado') {
    return (
      <div className="vista-principal">
        <Header nombre={`Bienvenido(a): ${nombre}`} toggleMenu={toggleMenu} handleLogout={handleLogout} />
        <Sidebar />
        <div className="contenido-vista">
          <div className="card-resultados">
            <img src={logoBienvenida} alt="Verano Rica" className="logo-bienvenida" />
            <h2 className="saludo">Gracias por tu interés</h2>
            <h1 className="mensaje-rechazo">
              No has sido seleccionado en esta edición <FaTimesCircle />
            </h1>
            <p className="mensaje-indicaciones">
              Agradecemos mucho tu participación. Te invitamos a seguir preparándote y volver a intentarlo en futuras convocatorias.
            </p>
            <button className="btn-continuar" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Aceptado
  if (estado === 'aceptado' && datos) {
    const nombreCompleto = `${datos.nombre} ${datos.apellido_paterno} ${datos.apellido_materno}`;
    const universidad = datos.universidad || '---';
    const carrera = datos.carrera || '---';

    const nombresAreas = {
      1: 'Dirección comercial core',
      2: 'Dirección comercial de negocios emergentes',
      3: 'Dirección de administración',
      4: 'Dirección de cadena de suministro',
      5: 'Dirección de capital humano',
      6: 'Dirección de desarrollo de mercado',
      7: 'Dirección de finanzas y administración',
      8: 'Dirección de tecnologías de la información',
      9: 'Dirección general',
      10: datos.otra_area_interes || 'Otro'
    };

    const area = nombresAreas[datos.area_id] || 'Área desconocida';
    const proyecto = datos.proyecto1 || '---';
    const fechaEntrevista = datos.fecha_registro
      ? new Date(datos.fecha_registro).toLocaleDateString()
      : 'Por asignar';

    return (
      <div className="vista-principal">
        <Header nombre={`Bienvenido(a): ${nombre}`} toggleMenu={toggleMenu} handleLogout={handleLogout} />
        <Sidebar />
        <div className="contenido-vista">
          <div className="card-resultados">
            <img src={logoBienvenida} alt="Verano Rica" className="logo-bienvenida" />
            <h2 className="saludo">¡Felicidades!</h2>
            <h1 className="mensaje-exito">
              Has sido aceptado en Verano RICA 2026 <FaCheckCircle />
            </h1>
            <p className="mensaje-indicaciones">
              Bienvenido(a) <strong>{nombreCompleto.toUpperCase()}</strong>, estudiante de <strong>{carrera}</strong> en <strong>{universidad}</strong>.
              Has sido asignado(a) al área <strong>{area}</strong>, para el proyecto <strong>{proyecto}</strong>.
            </p>
            <p className="mensaje-indicaciones">
              Fecha de entrevista registrada: <strong><FaCalendarAlt /> {fechaEntrevista}</strong>
            </p>
            <p className="mensaje-indicaciones">
              Te pedimos leer cuidadosamente los siguientes pasos para completar tu proceso y comenzar esta experiencia profesional.
            </p>
            <button
              className="btn-continuar"
              onClick={() => window.location.href = '/usuario/fases'}
            >
              IR A LOS SIGUIENTES PASOS
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Si estado es "pendiente" o "error"
  return (
    <div className="vista-principal">
      <Header nombre={`Bienvenido(a): ${nombre}`} toggleMenu={toggleMenu} handleLogout={handleLogout} />
      <Sidebar />
      <div className="contenido-vista">
        <div className="card-resultados">
          <h2 className="titulo-seccion">Tu proceso aún está en revisión. Por favor, vuelve a intentarlo más tarde.</h2>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VistaResultados;
