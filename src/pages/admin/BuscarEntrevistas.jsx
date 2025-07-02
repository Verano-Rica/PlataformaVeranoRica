import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/buscar.css';

const BuscarEntrevista = () => {
  const [busqueda, setBusqueda] = useState('');
  const [postulantes, setPostulantes] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [evaluacion, setEvaluacion] = useState({
    motivacion: '', habilidades: '', softwares: '', certificaciones: '',
    domicilio: '', transporte: '', disponibilidad_horaria: '',
    vision_5_anios: '', nivel_idiomas: '', detalles_adicionales: '',
    experiencia_destacada: '', expresion_oral: '', actitud: '',
    observaciones: '', recomendacion_final: ''
  });

  useEffect(() => {
    if (busqueda.trim() !== '') {
      axios.get(`http://localhost:3001/api/buscar-entrevista/buscar?nombre=${busqueda}`)
        .then(res => setPostulantes(res.data))
        .catch(err => console.error('Error al buscar:', err));
    } else {
      setPostulantes([]);
      setSeleccionado(null);
    }
  }, [busqueda]);

  const seleccionarPostulante = (p) => setSeleccionado(p);

  const handleChange = (e) => {
    setEvaluacion({ ...evaluacion, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!seleccionado) return;

    axios.post('http://localhost:3001/api/buscar-entrevista/guardar', {
      id_usuario: seleccionado.id,
      ...evaluacion
    }).then(() => {
      Swal.fire('¡Éxito!', 'Evaluación guardada correctamente.', 'success');
      setEvaluacion({});
    }).catch(() => {
      Swal.fire('Error', 'No se pudo guardar la evaluación.', 'error');
    });
  };

  return (
    <div className="panel-container">
      <Sidebar />
      <div className="panel-contenido">
        <Header />
        <div className="main-contenido">
          <h2 className="titulo">Evaluación de Entrevista</h2>

          <input
            type="text"
            placeholder="Buscar postulante..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="input-busqueda"
          />

          {postulantes.map(p => (
            <div
              key={p.id}
              className={`postulante ${seleccionado?.id === p.id ? 'seleccionado' : ''}`}
              onClick={() => seleccionarPostulante(p)}
            >
              <strong>{p.nombre} {p.apellido_paterno} {p.apellido_materno}</strong><br />
              {p.correo} | {p.fecha_entrevista} | Proyecto: {p.proyecto1}
            </div>
          ))}

          {seleccionado && (
            <div className="formulario-evaluacion">
              {Object.keys(evaluacion).map((campo) => (
                <div key={campo} className="campo-evaluacion">
                  <label>{campo.replaceAll('_', ' ')}</label>
                  {campo === 'recomendacion_final' ? (
                    <select name={campo} value={evaluacion[campo]} onChange={handleChange}>
                      <option value="">Seleccionar</option>
                      <option value="Sí">Sí</option>
                      <option value="No">No</option>
                      <option value="Bajo condiciones">Bajo condiciones</option>
                    </select>
                  ) : (
                    <textarea name={campo} value={evaluacion[campo]} onChange={handleChange} />
                  )}
                </div>
              ))}
              <button className="btn-guardar" onClick={handleSubmit}>Guardar Evaluación</button>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default BuscarEntrevista;
