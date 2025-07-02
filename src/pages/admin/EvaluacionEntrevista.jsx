import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/evaluacion.css';
import BotonRedondo from '../../components/BotonRedondo';
import { FaHome, FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const EvaluacionEntrevista = () => {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [postulante, setPostulante] = useState(null);
  const [errores, setErrores] = useState({});
  const [evaluacion, setEvaluacion] = useState({
    id_usuario: '',
    motivacion: '',
    habilidades: '',
    softwares: '',
    certificaciones: '',
    domicilio: '',
    transporte: '',
    disponibilidad_horaria: '',
    vision_5_anios: '',
    nivel_idiomas: '',
    detalles_adicionales: '',
    experiencia_destacada: '',
    expresion_oral: '',
    actitud: '',
    observaciones: '',
    recomendacion_final: ''
  });

  const navigate = useNavigate();

  const buscarCoincidencias = async (texto) => {
    setBusqueda(texto);
    if (texto.trim().length === 0) return setResultados([]);

    try {
      const res = await axios.get(`http://localhost:3001/api/admin/evaluacion/buscar?nombre=${texto}`);
      setResultados(res.data);
    } catch (error) {
      console.error('Error al buscar coincidencias:', error);
    }
  };

  const handleChange = (e) => {
    setEvaluacion({
      ...evaluacion,
      [e.target.name]: e.target.value
    });
    setErrores({ ...errores, [e.target.name]: '' }); // Limpia el error al escribir
  };

  const guardarEvaluacion = async () => {
    const camposObligatorios = [
      "motivacion", "habilidades", "softwares", "certificaciones", "domicilio",
      "transporte", "disponibilidad_horaria", "vision_5_anios", "nivel_idiomas",
      "detalles_adicionales", "experiencia_destacada", "expresion_oral",
      "actitud", "recomendacion_final"
    ];

    const nuevosErrores = {};
    camposObligatorios.forEach((campo) => {
      const valor = evaluacion[campo];
      if (typeof valor !== 'string' || valor.trim() === '') {
        nuevosErrores[campo] = 'Este campo es obligatorio';
      }
    });

    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    try {
      await axios.post('http://localhost:3001/api/admin/evaluacion/guardar', evaluacion);
      alert('✅ Evaluación guardada correctamente');
    } catch (error) {
      console.error('Error al guardar evaluación:', error);
      alert('❌ Error al guardar evaluación');
    }
  };

  return (
    <div className="panel-container">
      <Sidebar />
      <div className="main-content">
        <Header
          nombre={
            <span className="titulo-header-unido">
              <span className="programa-normal">Programa </span>
              <span className="verano-negritas">VERANO RICA</span>
            </span>
          }
        />

        <div className="contenido-evaluacion">
          <h2 className="titulo">Evaluación de Entrevista</h2>

          <div className="buscador">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={busqueda}
              onChange={(e) => buscarCoincidencias(e.target.value)}
            />
            {resultados.length > 0 && (
              <select
                onChange={async (e) => {
                  const selectedId = e.target.value;
                  if (!selectedId) return;

                  try {
                    const datos = await axios.get(`http://localhost:3001/api/admin/evaluacion/${selectedId}`);
                    setPostulante(datos.data);
                    setEvaluacion((prev) => ({
                      ...prev,
                      id_usuario: datos.data.id
                    }));
                  } catch (error) {
                    console.error('❌ Error al obtener datos del postulante:', error);
                  }
                }}
              >
                <option value="">Selecciona un postulante</option>
                {resultados.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.nombre} {r.apellido_paterno} {r.apellido_materno}
                  </option>
                ))}
              </select>
            )}
          </div>

          {postulante && (
            <>
              <div className="datos-postulante">
                <h3>Datos del Postulante</h3>
                <div className="fila"><span className="etiqueta">Nombre:</span><span className="valor">{postulante.nombre} {postulante.apellido_paterno} {postulante.apellido_materno}</span></div>
                <div className="fila"><span className="etiqueta">Correo:</span><span className="valor">{postulante.correo}</span></div>
                <div className="fila"><span className="etiqueta">Universidad:</span><span className="valor">{postulante.universidad}</span></div>
                <div className="fila"><span className="etiqueta">Carrera:</span><span className="valor">{postulante.carrera}</span></div>
                <div className="fila"><span className="etiqueta">Área:</span><span className="valor">{postulante.area}</span></div>
                <div className="fila"><span className="etiqueta">Teléfono:</span><span className="valor">{postulante.telefono}</span></div>
                <div className="fila"><span className="etiqueta">Proyectos:</span><span className="valor">{postulante.proyecto1} / {postulante.proyecto2}</span></div>
                <div className="fila"><span className="etiqueta">Otro proyecto:</span><span className="valor">{postulante.otro_proyecto}</span></div>
                <div className="fila"><span className="etiqueta">Fecha entrevista:</span><span className="valor">{new Date(postulante.fecha_entrevista).toLocaleString()}</span></div>
                <div className="fila"><span className="etiqueta">CV:</span><span className="valor">{postulante.cv_nombre}</span></div>
              </div>

              <div className="formulario-evaluacion">
                {[
                  { label: "Motivación", name: "motivacion", type: "textarea" },
                  { label: "Habilidades", name: "habilidades", type: "textarea" },
                  { label: "Softwares que maneja", name: "softwares", type: "textarea" },
                  { label: "Certificaciones", name: "certificaciones", type: "textarea" },
                  { label: "Domicilio", name: "domicilio", type: "textarea" },
                  { label: "Transporte", name: "transporte", type: "textarea" },
                  { label: "Disponibilidad horaria", name: "disponibilidad_horaria", type: "select", options: ["Sí", "No"] },
                  { label: "Visión a 5 años", name: "vision_5_anios", type: "textarea" },
                  { label: "Nivel de inglés u otros idiomas", name: "nivel_idiomas", type: "textarea" },
                  { label: "Detalles adicionales del postulante", name: "detalles_adicionales", type: "textarea" },
                  { label: "Experiencia o proyecto destacado", name: "experiencia_destacada", type: "textarea" },
                  { label: "Nivel de expresión oral", name: "expresion_oral", type: "select", options: ["Excelente", "Bueno", "Regular", "Deficiente"] },
                  { label: "Actitud durante la entrevista", name: "actitud", type: "select", options: ["Muy positiva", "Positiva", "Neutral", "Negativa"] },
                  { label: "Observaciones generales", name: "observaciones", type: "textarea" },
                  { label: "Recomendación final", name: "recomendacion_final", type: "select", options: ["Sí", "No", "Bajo condiciones"] }
                ].map(campo => (
                  <div className="campo" key={campo.name}>
                    <label>{campo.label}</label>
                    {campo.type === "select" ? (
                      <select
                        name={campo.name}
                        value={evaluacion[campo.name]}
                        onChange={handleChange}
                        className={errores[campo.name] ? 'campo-error' : ''}
                      >
                        <option value="">Selecciona una opción</option>
                        {campo.options.map(opcion => (
                          <option key={opcion} value={opcion}>{opcion}</option>
                        ))}
                      </select>
                    ) : (
                      <textarea
                        name={campo.name}
                        value={evaluacion[campo.name]}
                        onChange={handleChange}
                        className={errores[campo.name] ? 'campo-error' : ''}
                      />
                    )}
                    {errores[campo.name] && <p className="mensaje-error">{errores[campo.name]}</p>}
                  </div>
                ))}

                <button className="btn-guardar" onClick={guardarEvaluacion}>Guardar Evaluación</button>
              </div>
            </>
          )}
        </div>

        {/* ✅ Botones flotantes */}
        <div className="iconos-body">
          <div className="flecha-body-izquierda">
            <BotonRedondo icono={<FaArrowCircleLeft />} ariaLabel="siguiente" onClick={() => navigate('/admin/usuarios-agendados')} />
          </div>
          <div className="home-body-centrado">
            <BotonRedondo icono={<FaHome />} ariaLabel="Inicio" onClick={() => navigate('/admin')} />
          </div>
          <div className="flecha-body-derecha">
            <BotonRedondo icono={<FaArrowCircleRight />} ariaLabel="Volver" onClick={() => navigate('/admin/postulantes')} />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default EvaluacionEntrevista;
