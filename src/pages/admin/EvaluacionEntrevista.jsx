import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/evaluacion.css';

const EvaluacionEntrevista = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [formulario, setFormulario] = useState({
    motivacion: '',
    habilidades: '',
    softwares: '',
    certificaciones: '',
    domicilio: '',
    transporte: '',
    vision_5_anos: '',
    disponibilidad_horaria: '',
    area_interes_entrevista: '',
    detalles_adicionales: '',
    nivel_comunicacion: '',
    experiencia_destacada: '',
    nivel_expresion_oral: '',
    actitud: '',
    nivel_idioma: '',
    observaciones: '',
    recomendacion: ''
  });

  useEffect(() => {
    fetch(`http://localhost:3001/api/usuarios/${id}`)
      .then(res => res.json())
      .then(data => setUsuario(data));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = () => {
    fetch('http://localhost:3001/api/evaluacion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_usuario: id, ...formulario })
    })
      .then(res => res.json())
      .then(data => alert('Evaluación guardada correctamente'))
      .catch(err => console.error('Error al guardar evaluación:', err));
  };

  return (
    <div className="contenido-admin">
      <Header />
      <Sidebar />
      <div className="evaluacion-container">
        <h2>Evaluación de Entrevista</h2>
        {usuario && (
          <div className="datos-usuario">
            <p><strong>Nombre:</strong> {usuario.nombre} {usuario.apellido_paterno} {usuario.apellido_materno}</p>
            <p><strong>Correo:</strong> {usuario.correo}</p>
          </div>
        )}

        <div className="formulario-evaluacion">
          {[
            { label: 'Motivación', name: 'motivacion' },
            { label: 'Habilidades', name: 'habilidades' },
            { label: 'Softwares que maneja', name: 'softwares' },
            { label: 'Certificaciones', name: 'certificaciones' },
            { label: 'Domicilio', name: 'domicilio' },
            { label: 'Transporte', name: 'transporte' },
            { label: 'Visión a 5 años', name: 'vision_5_anos' },
            { label: 'Disponibilidad horaria', name: 'disponibilidad_horaria' },
            { label: 'Área de interés mencionada', name: 'area_interes_entrevista' },
            { label: 'Detalles adicionales', name: 'detalles_adicionales' },
            { label: 'Experiencia o proyecto destacado', name: 'experiencia_destacada' },
            { label: 'Actitud durante la entrevista', name: 'actitud' },
            { label: 'Nivel de inglés u otros idiomas', name: 'nivel_idioma' },
            { label: 'Observaciones generales', name: 'observaciones' }
          ].map((field) => (
            <div key={field.name}>
              <label>{field.label}:</label>
              <textarea
                name={field.name}
                value={formulario[field.name]}
                onChange={handleChange}
              />
            </div>
          ))}

          <label>Nivel de comunicación:</label>
          <select
            name="nivel_comunicacion"
            value={formulario.nivel_comunicacion}
            onChange={handleChange}
          >
            <option value="">--Selecciona--</option>
            <option value="Excelente">Excelente</option>
            <option value="Bueno">Bueno</option>
            <option value="Regular">Regular</option>
            <option value="Bajo">Bajo</option>
          </select>

          <label>Nivel de expresión oral:</label>
          <select
            name="nivel_expresion_oral"
            value={formulario.nivel_expresion_oral}
            onChange={handleChange}
          >
            <option value="">--Selecciona--</option>
            <option value="Excelente">Excelente</option>
            <option value="Bueno">Bueno</option>
            <option value="Regular">Regular</option>
            <option value="Débil">Débil</option>
          </select>

          <label>Recomendación final:</label>
          <select
            name="recomendacion"
            value={formulario.recomendacion}
            onChange={handleChange}
          >
            <option value="">--Selecciona--</option>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>

          <button className="btn-guardar" onClick={handleSubmit}>Guardar Evaluación</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EvaluacionEntrevista;
