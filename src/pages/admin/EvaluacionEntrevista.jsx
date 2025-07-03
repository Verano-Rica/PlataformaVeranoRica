import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/evaluacion.css';
import BotonRedondo from '../../components/BotonRedondo';
import { FaHome, FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const EvaluacionEntrevista = () => {
  const [busqueda, setBusqueda] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [formulario, setFormulario] = useState({
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
    nivel_expresion: '',
    actitud: '',
    observaciones: '',
    recomendacion: ''
  });
   const navigate = useNavigate();

  const buscarUsuario = () => {
    axios.get(`http://localhost:3001/api/evaluacion/buscar?nombre=${busqueda}`)
      .then(res => {
        if (res.data.length > 0) {
          setUsuario(res.data[0]);
        } else {
          Swal.fire('Sin resultados', 'No se encontró al usuario', 'warning');
        }
      })
      .catch(() => Swal.fire('Error', 'Error al buscar usuario', 'error'));
  };

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!usuario || !formulario.motivacion || !formulario.habilidades || !formulario.actitud || !formulario.recomendacion) {
      return Swal.fire('Campos requeridos', 'Llena todos los campos obligatorios', 'warning');
    }

    const datos = {
      id_usuario: usuario.id,
      ...formulario
    };

    axios.post('http://localhost:3001/api/evaluacion/guardar', datos)
      .then(() => {
        Swal.fire('Éxito', 'Evaluación guardada correctamente', 'success');
        setFormulario({
          motivacion: '', habilidades: '', softwares: '', certificaciones: '',
          domicilio: '', transporte: '', disponibilidad_horaria: '', vision_5_anios: '',
          nivel_idiomas: '', detalles_adicionales: '', experiencia_destacada: '',
          nivel_expresion: '', actitud: '', observaciones: '', recomendacion: ''
        });
        setUsuario(null);
        setBusqueda('');
      })
      .catch(() => Swal.fire('Error', 'No se pudo guardar la evaluación', 'error'));
  };

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
          <h2 className="titulo-principal">Evaluación de Entrevista</h2>

          <div className="contenedor-evaluacion">
            <div className="buscador-evaluacion">
              <input
                type="text"
                className="input-busqueda"
                placeholder="Buscar por nombre completo"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <button className="btn-buscar" onClick={buscarUsuario}>Buscar</button>
            </div>

            {usuario && (
              <div className="card-datos">
                <p><strong>Nombre:</strong> {usuario.nombre} {usuario.apellido_paterno} {usuario.apellido_materno}</p>
                <p><strong>Correo:</strong> {usuario.correo}</p>
                <p><strong>Proyecto elegido:</strong> {usuario.proyecto1}</p>
              </div>
            )}

            {usuario && (
              <form className="formulario-evaluacion" onSubmit={handleSubmit}>
                {[
                  { name: 'motivacion', type: 'textarea', required: true },
                  { name: 'habilidades', type: 'textarea', required: true },
                  { name: 'softwares' },
                  { name: 'certificaciones' },
                  { name: 'domicilio' },
                  { name: 'transporte' },
                  { name: 'disponibilidad_horaria' },
                  { name: 'vision_5_años', type: 'textarea' },
                  { name: 'nivel_idiomas' },
                  { name: 'detalles_adicionales', type: 'textarea' },
                  { name: 'experiencia_destacada', type: 'textarea' },
                  { name: 'nivel_expresion' },
                  { name: 'actitud', required: true },
                  { name: 'observaciones', type: 'textarea' }
                ].map(({ name, type = 'input', required }) => (
                  <div key={name} className="campo-formulario">
                    {type === 'textarea' ? (
                      <textarea
                        name={name}
                        placeholder={name.replace(/_/g, ' ')}
                        value={formulario[name]}
                        onChange={handleChange}
                        required={required}
                      />
                    ) : (
                      <input
                        type="text"
                        name={name}
                        placeholder={name.replace(/_/g, ' ')}
                        value={formulario[name]}
                        onChange={handleChange}
                        required={required}
                      />
                    )}
                  </div>
                ))}

                <div className="campo-formulario">
                  <select
                    name="recomendacion"
                    value={formulario.recomendacion}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Recomendación final</option>
                    <option value="Sí">Sí</option>
                    <option value="No">No</option>
                    <option value="Bajo condiciones">Bajo condiciones</option>
                  </select>
                </div>
                <button type="submit" className="btn-guardar">Guardar Evaluación</button>
              </form>
            )}
          </div>
          <div>
            <br />
<br />

          </div>
                    {/* ✅ Botones flotantes */}
          <div className="iconos-body">
            <div className="flecha-body-izquierda">
              <BotonRedondo icono={<FaArrowCircleLeft />} ariaLabel="Volver" onClick={() => navigate('/admin/usuarios-agendados')} />
            </div>
            <div className="home-body-centrado">
              <BotonRedondo icono={<FaHome />} ariaLabel="Inicio" onClick={() => navigate('/admin')} />
            </div>
            <div className="flecha-body-derecha">
              <BotonRedondo icono={<FaArrowCircleRight />} ariaLabel="Siguiente" onClick={() => navigate('/admin/postulantes')} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default EvaluacionEntrevista;
