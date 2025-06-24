import React from 'react';
import '../../styles/resultados.css';
import logoBienvenida from '../../assets/icono-bienvenida.png';
// import logoRica from '../../assets/icono-rica.png';
import { FaThumbsUp } from 'react-icons/fa';

const VistaResultados = () => {
  return (
    <div className="resultados-container">
      {/* Encabezado rojo */}
      <div className="barra-superior">
        <div className="barra-contenido">
          <div className="usuario-info">
            <div className="avatar" />
            <h1 className="usuario-nombre">Larisa Moreno Zamora</h1>
          </div>
          <button className="btn-cerrar">Cerrar sesión</button>
        </div>
      </div>

      {/* Contenido blanco central */}
      <div className="card-resultados">
        <h2 className="titulo-seccion">Tus resultados:</h2>
        <img src={logoBienvenida} alt="Bienvenida Verano Rica" className="logo-bienvenida" />

        <h3 className="saludo">¡Hola!</h3>
        <h1 className="mensaje-exito">
          Felicidades ahora formas parte del equipo <br />
          Verano RICA 2026: <FaThumbsUp />
        </h1>

        <p className="mensaje-indicaciones">
          Ahora deberas completar una sección de pasos para culminar con tu proceso de selección.
        </p>

        <button className="btn-continuar">CONTINUAR</button>
      </div>

      {/* Icono home inferior */}
      <div className="footer-icono">
        <div className="home-icono"></div>
      </div>

      {/* Pie de página */}
      <footer className="footer">
        <p>© 2026 Experiencia Verano RICA - Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default VistaResultados;
