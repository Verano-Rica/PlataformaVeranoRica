import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import BotonRedondo from '../../components/BotonRedondo';
import { FaHome, FaArrowRight, FaArrowCircleRight } from 'react-icons/fa';

import '../../styles/proyectos.css';
import '../../styles/botonRedondo.css';

const proyectos = [
  {
    id: 1,
    titulo: 'Documentación y actualización de procesos del área de capacitación',
    descripcion: 'Actualizar los procedimientos del área, así como la creación de procedimientos faltantes de acuerdo con los mapas del puesto.',
    habilidades: 'Reingeniería de procesos, calidad, redacción y ortografía',
    carrera: 'Ingeniería industrial, gestión de procesos, administración de empresas',
    materiales: 'Laptop y paquetería Office',
    responsable: 'Anfra Carylu Molina Salazar / Capital Humano / cmolina@rica.com.mx / 7441350298'
  },
  {
    id: 2,
    titulo: 'Gestión de Relaciones Laborales',
    descripcion: 'Identificar puntos de control para gestionar relaciones laborales con comunicación, prevención de conflictos y cumplimiento normativo.',
    habilidades: 'Laborales',
    carrera: 'Administrativa - Legal',
    materiales: 'Laptop, Office',
    responsable: 'Edwin Alberto Ramírez Morales / Capital Humano / eramirez@rica.com.mx / 7712189570'
  },
  {
    id: 3,
    titulo: 'Optimización de base de datos Negocios Core',
    descripcion: 'Estandarizar base de datos para mejor análisis por canal, geolocalización, teléfono, etc.',
    habilidades: 'Excel, SAP, facilidad de palabra',
    carrera: 'Ingeniería industrial, administración',
    materiales: 'Laptop, SAP, Tableau, Power BI',
    responsable: 'Gerardo Saucedo / Área Comercial / gsaucedo@rica.com.mx / 7715664342'
  },
  {
    id: 4,
    titulo: 'Actualización de MRP',
    descripcion: 'Actualizar sistema MRP, identificar stock ocioso, rediseñar layout de almacén y crear material informativo.',
    habilidades: 'MRP, gestión de inventario, layout, comunicación, trabajo en equipo',
    carrera: 'Ingeniería industrial, administración',
    materiales: 'Laptop, Office, Internet, CANVAS',
    responsable: 'Jesús Cortes Torrescano / Finanzas / icortes@rica.com.mx / 7712021778'
  },
  {
    id: 7,
    titulo: 'Multicategorías en Canal tradicional',
    descripcion: 'Incorporar nuevas categorías al portafolio en canal tradicional para aumentar distribución y generar ingresos.',
    habilidades: 'Administración, mercadotecnia, planeación, Excel, Canva, PowerPoint',
    carrera: 'Ingeniería industrial, marketing, administración de negocios',
    materiales: 'Laptop, Office, Tableau',
    responsable: 'Carlos Lara / Desarrollo de mercado / clara@rica.com.mx / 5545660766'
  },
  {
    id: 8,
    titulo: 'Proyectos en TI, Finanzas, RH, Nómina, Ciberseguridad, Programación',
    descripcion: 'Atender un proyecto por cada área de TI durante la estancia.',
    habilidades: 'Tecnología, programación, software',
    carrera: 'Ingeniería en sistemas, TI o carrera afín',
    materiales: 'Laptop proporcionada por Grupo Rica',
    responsable: 'Annel Ascencio Pérez / Tecnologías de Información / aascencio@rica.com.mx / 7717959899'
  }
];

const VistaProyectos = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [modal, setModal] = useState(false);
  const [proyecto, setProyecto] = useState(null);
  const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem('usuario')) || {};
  const nombre = usuario.nombre || 'Usuario';

  const abrirModal = (p) => {
    setProyecto(p);
    setModal(true);
  };

  const cerrarModal = () => {
    setModal(false);
    setProyecto(null);
  };

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const handleLogout = () => (window.location.href = '/');

  return (
    <div className={`panel-container ${menuAbierto ? 'menu-activo' : ''}`}>
      <Sidebar />
      <div className="panel-contenido">
      <Header nombre={`Bienvenido(a): ${nombre}`} toggleMenu={toggleMenu} handleLogout={handleLogout} />

        <main className="main-contenido">
          <div className="proyectos-container">
            <h2 className="titulo-principal-proyectos">
              Visualiza el <span className="subrayado-rojo">Proyecto</span> al que quieres participar para Verano RICA 2026
            </h2>

            <div className="proyectos-lista">
              {proyectos.map((p, i) => (
                <div
                  key={p.id}
                  className={`proyecto-item ${i % 2 === 0 ? 'izquierda' : 'derecha'}`}
                  onClick={() => abrirModal(p)}
                >
                  <div className="rombo"><span>{p.id}</span></div>
                  <div className="texto-proyecto">
                    <strong>Proyecto {p.id}:</strong><br />"{p.titulo}"
                  </div>
                </div>
              ))}
            </div>
          </div>

          {modal && proyecto && (
            <div className="modal-overlay" onClick={cerrarModal}>
              <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
                <button className="cerrar-modal" onClick={cerrarModal}>X</button>
                <h3>{proyecto.titulo}</h3>
                <p><strong>Descripción:</strong> {proyecto.descripcion}</p>
                <p><strong>Habilidades:</strong> {proyecto.habilidades}</p>
                <p><strong>Materiales:</strong> {proyecto.materiales}</p>
                <p><strong>Carrera:</strong> {proyecto.carrera}</p>
                <p><strong>Responsable:</strong> {proyecto.responsable}</p>
              </div>
            </div>
          )}
                    {/* Navegación inferior */}
          <div className="iconos-body">
            <div className="home-body-centrado">
              <BotonRedondo icono={<FaHome />} ariaLabel="Inicio" onClick={() => navigate('/usuario/panel')} />
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
