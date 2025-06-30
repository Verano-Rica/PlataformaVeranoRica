import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/resultados.css';
import logoBienvenida from '../../assets/icono-bienvenida.png';
import BotonRedondo from '../../components/BotonRedondo';
import '../../styles/vistaGeneral.css';

import {
  FaCheckCircle,
  FaCalendarAlt,
  FaTimesCircle,
  FaHome
} from 'react-icons/fa';

const VistaResultados = () => {
  const [datos, setDatos] = useState(null);
  const [estado, setEstado] = useState(null);
  const userId = localStorage.getItem('userId');
  const usuario = JSON.parse(localStorage.getItem('usuario')) || {};
  const nombre = usuario.nombre || 'Usuario';

  // ✅ Título personalizado para el Header
  const tituloPersonalizado = (
    <span className="titulo-header-unido">
      <span className="programa-normal">Programa </span>
      <span className="verano-negritas">VERANO RICA</span>
    </span>
  );

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

  const toggleMenu = () => {};
  const handleLogout = () => (window.location.href = '/');

  if (estado === null) {
    return (
      <div className="vista-principal">
        <Header nombre={tituloPersonalizado} toggleMenu={toggleMenu} handleLogout={handleLogout} />
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

  if (estado === 'rechazado') {
    return (
      <div className="vista-principal">
        <Header nombre={tituloPersonalizado} toggleMenu={toggleMenu} handleLogout={handleLogout} />
        <Sidebar />
        <div className="contenido-vista">
          <div className="card-resultados">
            <img src={logoBienvenida} alt="Verano Rica" className="logo-bienvenida" />
            <h2 className="saludo">Gracias por tu interés</h2>
            <h1 className="mensaje-rechazo">
              No has sido seleccionado en esta edición <FaTimesCircle />
            </h1>
            <p className="mensaje-indicaciones">
              Agradecemos mucho tu participación. Te invitamos a seguir preparándote profesionalmente.
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

  if (estado === 'aceptado' && datos) {
    const nombreCompleto = `${datos.nombre} ${datos.apellido_paterno} ${datos.apellido_materno}`;
    const universidad = datos.universidad || '---';
    const carrera = datos.carrera || '---';
    const areaFinal = datos.nombre_area_final || 'Área no asignada';
    const subarea = datos.subarea_especifica || '---';
    const proyectoFinal = datos.proyecto_asignado_final || '---';
    const fechaEntrevista = datos.fecha_registro
      ? new Date(datos.fecha_registro).toLocaleDateString()
      : 'Por asignar';

    return (
      <div className="vista-principal">
        <Header nombre={tituloPersonalizado} toggleMenu={toggleMenu} handleLogout={handleLogout} />
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
              Has sido asignado(a) al área <strong>{areaFinal}</strong>, subárea <strong>{subarea}</strong>, para el proyecto <strong>{proyectoFinal}</strong>.
            </p>
            <p className="mensaje-indicaciones">
             <strong><FaCalendarAlt /> Fecha de inicio 1 de Junio del 2026 </strong>
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

          <div className="iconos-body">
            <div className="home-body-centrado">
              <BotonRedondo 
                icono={<FaHome />} 
                ariaLabel="Inicio" 
                onClick={() => window.location.href = '/usuario'} 
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="vista-principal">
      <Header nombre={tituloPersonalizado} toggleMenu={toggleMenu} handleLogout={handleLogout} />
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
