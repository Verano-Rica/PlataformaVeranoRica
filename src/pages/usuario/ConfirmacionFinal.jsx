// ConfirmacionFinal.jsx
import React, { useState } from 'react';
import '../../styles/ConfirmacionFinal.css';

const ConfirmacionFinal = () => {
  const [form, setForm] = useState({
    talla: '',
    disponible: false,
    evaluaciones: false,
    archivos: {
      ine: null,
      curp: null,
      rfc: null,
      acta: null,
      comprobanteEstudios: null,
      comprobanteDomicilio: null,
    },
  });

  const handleFileChange = (e, campo) => {
    setForm({
      ...form,
      archivos: {
        ...form.archivos,
        [campo]: e.target.files[0],
      },
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('talla', form.talla);
    formData.append('disponible', form.disponible);
    formData.append('evaluaciones', form.evaluaciones);

    Object.entries(form.archivos).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });

    try {
      const res = await fetch('http://localhost:3001/api/fase-final', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) alert('¡Confirmación completada!');
    } catch (err) {
      console.error(err);
      alert('Hubo un error al enviar los datos');
    }
  };

  return (
    <div className="contenedor-confirmacion">
      <h2>CONFIRMACIÓN FINAL</h2>
      <div className="linea-fases">
        <div className="fase activa">Fase 1</div>
        <div className="fase activa">Fase 2</div>
        <div className="fase activa">Fase 3</div>
        <div className="fase activa">Fase 4</div>
      </div>

      <div className="bloque-form">
        <h3>Subir documentos</h3>
        {['ine', 'rfc', 'curp', 'acta', 'comprobanteEstudios', 'comprobanteDomicilio'].map((campo) => (
          <div key={campo} className="campo-upload">
            <label>{campo.toUpperCase()}:</label>
            <input type="file" onChange={(e) => handleFileChange(e, campo)} />
          </div>
        ))}
      </div>

      <div className="bloque-form">
        <h3>Talla de Playera</h3>
        <select value={form.talla} onChange={(e) => setForm({ ...form, talla: e.target.value })}>
          <option value="">Selecciona tu talla</option>
          <option value="XS">XS</option>
          <option value="CH">CH</option>
          <option value="M">M</option>
          <option value="G">G</option>
          <option value="XG">XG</option>
        </select>
      </div>

      <div className="bloque-form">
        <h3>Confirmación de disponibilidad</h3>
        <label>
          <input
            type="checkbox"
            checked={form.disponible}
            onChange={(e) => setForm({ ...form, disponible: e.target.checked })}
          />
          Estoy disponible del 2 de junio al 25 de julio
        </label>
      </div>

      <div className="bloque-form">
        <h3>Evaluaciones</h3>
        <p>Realiza tus evaluaciones en el siguiente link con el código: <strong>becprimerempleo2025</strong></p>
        <a href="https://evaluatest.com/Core/Evaluate/IUEvaluacion/HomeLoginCandidatos.asp" target="_blank" rel="noopener noreferrer">
          Ir a Evaluaciones
        </a>
        <label>
          <input
            type="checkbox"
            checked={form.evaluaciones}
            onChange={(e) => setForm({ ...form, evaluaciones: e.target.checked })}
          />
          He finalizado mis evaluaciones
        </label>
      </div>

      <button className="btn-confirmar" onClick={handleSubmit}>CONFIRMAR</button>
    </div>
  );
};

export default ConfirmacionFinal;
