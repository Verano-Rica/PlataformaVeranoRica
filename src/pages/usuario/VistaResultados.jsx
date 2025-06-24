import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/resultados.css';
import logoBienvenida from '../../assets/icono-bienvenida.png';
import { FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';

const VistaResultados = () => {
  const [datos, setDatos] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetch(`http://localhost:3001/api/aceptados/estado/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.estado === 'aceptado') {
          setDatos(data.datos);
        }
      })
      .catch(err => console.error('Error al consultar estado:', err));
  }, [userId]);

  if (!datos) {
    return (
      <div className="vista-principal">
        <Header />
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

  const nombreCompleto = `${datos.nombre} ${datos.apellido_paterno} ${datos.apellido_materno}`;
  const universidad = datos.universidad || '---';
  const carrera = datos.carrera || '---';
  const area = datos.area_id === 10 ? datos.otra_area_interes : datos.area_id || '---';
  const proyecto = datos.proyecto1 || '---';
  const fechaEntrevista = datos.fecha_registro
    ? new Date(datos.fecha_registro).toLocaleDateString()
    : 'Por asignar';

  return (
    <div className="vista-principal">
      <Header />
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
};

export default VistaResultados;
