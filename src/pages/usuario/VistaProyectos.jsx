import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import BotonRedondo from '../../components/BotonRedondo';
import {
  FaHome,
  FaArrowCircleRight,
  FaArrowCircleLeft,
  FaUser,
  FaBuilding,
  FaEnvelope,
  FaPhone
} from 'react-icons/fa';

import '../../styles/proyectos.css';
import '../../styles/botonRedondo.css';

const VistaProyectos = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [modal, setModal] = useState(false);
  const [proyecto, setProyecto] = useState(null);
  const [proyectos, setProyectos] = useState([]);
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem('usuario')) || {};
  const nombre = usuario.nombre || 'Usuario';

  useEffect(() => {
    fetch('http://localhost:3001/api/proyectos')
      .then(res => res.json())
      .then(data => setProyectos(data))
      .catch(err => console.error('Error al cargar proyectos:', err));
  }, []);

  const abrirModal = (p) => {
    setProyecto(p);
    setModal(true);
  };

  const cerrarModal = () => {
    setModal(false);
    setProyecto(null);
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
          <div className="proyectos-container">
            <center><h2 className="titulo-principal-proyectos">
              Infórmate de los <span className="subrayado-rojo">proyectos</span> a los que puedes participar en Verano RICA 2026
            </h2></center>

            <div className="proyectos-lista">
              {proyectos.map((p, i) => (
                <div
                  key={p.id}
                  className={`proyecto-item ${i % 2 === 0 ? 'izquierda' : 'derecha'}`}
                  onClick={() => abrirModal(p)}
                >
                  <div className="rombo"><span>{p.id}</span></div>
                  <div className="texto-proyecto">
                    <span className="titulo-proyecto-linea"> <strong>Proyecto {p.id}:</strong> "{p.titulo}" </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Botón Seleccionar Proyectos */}
            <div className="contenedor-boton-proyectos">
              <button className="boton-seleccionar-proyectos" onClick={() => navigate('/usuario/entrevista')}>
                Seleccionar Proyectos
              </button>
            </div>
          </div>

          {/* MODAL FIJO */}
          {modal && proyecto && (
            <div className="modal-overlay" onClick={cerrarModal}>
              <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
                <button className="cerrar-modal" onClick={cerrarModal} aria-label="Cerrar">
                  <span>&times;</span>
                </button>
                <h3>{proyecto.titulo}</h3>
                <p><strong>Descripción:</strong> {proyecto.descripcion}</p>
                <p><strong>Habilidades:</strong> {proyecto.habilidades}</p>
                <p><strong>Materiales:</strong> {proyecto.materiales}</p>
                <p><strong>Carrera:</strong> {proyecto.carrera}</p>
                <p><strong>Responsable:</strong></p>
                <div className="datos-responsable">
                  <p><FaUser className="icono-resp" /> <strong>Nombre:</strong> {proyecto.nombre_responsable}</p>
                  <p><FaBuilding className="icono-resp" /> <strong>Área:</strong> {proyecto.area_responsable}</p>
                  <p><FaEnvelope className="icono-resp" /> <strong>Correo:</strong>
                    <a href={`mailto:${proyecto.correo_responsable}`} className="link-correo">
                      {proyecto.correo_responsable}
                    </a>
                  </p>
                  <p><FaPhone className="icono-resp" /> <strong>Teléfono:</strong> {proyecto.telefono_responsable}</p>
                </div>
              </div>
            </div>
          )}

          {/* NAVEGACIÓN INFERIOR */}
          <div className="iconos-body">
            <div className="home-body-anterior">
              <BotonRedondo icono={<FaArrowCircleLeft />} ariaLabel="Anterior" onClick={() => navigate('/usuario/formulario')} />
            </div>
            <div className="home-body-centrado">
              <BotonRedondo icono={<FaHome />} ariaLabel="Inicio" onClick={() => navigate('/usuario')} />
            </div>
            <div className="flecha-body-derecha">
              <BotonRedondo icono={<FaArrowCircleRight />} ariaLabel="Siguiente" onClick={() => navigate('/usuario/entrevista')} />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default VistaProyectos;