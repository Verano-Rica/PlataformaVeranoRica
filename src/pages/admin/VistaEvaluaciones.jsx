import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import BotonRedondo from '../../components/BotonRedondo';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../../styles/evaluacion.css';

const VistaEvaluaciones = () => {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/admin/reporte-evaluaciones')
      .then(res => setEvaluaciones(res.data))
      .catch(err => console.error('Error al cargar evaluaciones:', err));
  }, []);

  return (
    <div className="panel-container">
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

        <div className="main-contenido">
          <h2 className="titulo-principal">Reporte completo de Evaluaciones</h2>
          <div className="tabla-contenedor">
            <table className="tabla-postulantes">
              <thead>
                <tr>
                  <th>ID Usuario</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Motivación</th>
                  <th>Habilidades</th>
                  <th>Softwares</th>
                  <th>Certificaciones</th>
                  <th>Domicilio</th>
                  <th>Transporte</th>
                  <th>Disponibilidad Horaria</th>
                  <th>Visión 5 años</th>
                  <th>Nivel Idiomas</th>
                  <th>Detalles Adicionales</th>
                  <th>Experiencia Destacada</th>
                  <th>Nivel de Expresión</th>
                  <th>Actitud</th>
                  <th>Observaciones</th>
                  <th>Recomendación</th>
                  <th>Fecha Evaluación</th>
                </tr>
              </thead>
              <tbody>
                {evaluaciones.map((ev) => (
                  <tr key={ev.id}>
                    <td>{ev.id_usuario}</td>
                    <td>{`${ev.nombre} ${ev.apellido_paterno} ${ev.apellido_materno}`}</td>
                    <td>{ev.correo}</td>
                    <td>{ev.motivacion}</td>
                    <td>{ev.habilidades}</td>
                    <td>{ev.softwares}</td>
                    <td>{ev.certificaciones}</td>
                    <td>{ev.domicilio}</td>
                    <td>{ev.transporte}</td>
                    <td>{ev.disponibilidad_horaria}</td>
                    <td>{ev.vision_5_anios}</td>
                    <td>{ev.nivel_idiomas}</td>
                    <td>{ev.detalles_adicionales}</td>
                    <td>{ev.experiencia_destacada}</td>
                    <td>{ev.nivel_expresion}</td>
                    <td>{ev.actitud}</td>
                    <td>{ev.observaciones}</td>
                    <td>{ev.recomendacion}</td>
                    <td>{new Date(ev.fecha_evaluacion).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
                  <div className="iconos-body">
          <div className="home-body-centrado">
            <BotonRedondo
              icono={<FaHome />}
              ariaLabel="Inicio"
              onClick={() => navigate('/admin')}
            />
          </div>
        </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default VistaEvaluaciones;
