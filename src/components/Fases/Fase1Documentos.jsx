import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../../styles/fasesProceso.css';

const Fase1Documentos = ({ idUsuario }) => {
  const [documentos, setDocumentos] = useState({
    cv: null,
    ine: null,
    curp: null,
    acta: null,
    comprobante: null
  });

  const handleChange = (e, campo) => {
    setDocumentos({ ...documentos, [campo]: e.target.files[0] });
  };

  const handleSubmit = async () => {
    const hayAlMenosUno = Object.values(documentos).some(doc => doc);
    if (!hayAlMenosUno) {
      Swal.fire('Advertencia', 'Debes subir al menos un documento', 'warning');
      return;
    }

    const formData = new FormData();
    formData.append('id_usuario', idUsuario);
    Object.entries(documentos).forEach(([clave, archivo]) => {
      if (archivo) formData.append(clave, archivo);
    });

    try {
      const res = await fetch('http://localhost:3001/api/fasefinal/guardar', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire('Éxito', 'Documentos guardados correctamente', 'success');
      } else {
        Swal.fire('Error', data.error || 'No se pudieron guardar los documentos', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Fallo en la petición al servidor', 'error');
    }
  };

  return (
    <div className="contenedor-fase">
      <h3 className="titulo-fase">Subir documentos</h3>

      <div className="grupo-campo">
        <div className="numero-circulo">1</div>
        <label className="label-documento">CV:</label>
        <input className="input-documento" type="file" onChange={e => handleChange(e, 'cv')} />
      </div>

      <div className="grupo-campo">
        <div className="numero-circulo">2</div>
        <label className="label-documento">IDENTIFICACIÓN:</label>
        <input className="input-documento" type="file" onChange={e => handleChange(e, 'ine')} />
      </div>

      <div className="grupo-campo">
        <div className="numero-circulo">3</div>
        <label className="label-documento">CURP:</label>
        <input className="input-documento" type="file" onChange={e => handleChange(e, 'curp')} />
      </div>

      <div className="grupo-campo">
        <div className="numero-circulo">4</div>
        <label className="label-documento">ACTA DE NACIMIENTO:</label>
        <input className="input-documento" type="file" onChange={e => handleChange(e, 'acta')} />
      </div>

      <div className="grupo-campo">
        <div className="numero-circulo">5</div>
        <label className="label-documento">COMPROBANTE DE DOMICILIO:</label>
        <input className="input-documento" type="file" onChange={e => handleChange(e, 'comprobante')} />
      </div>

      <button className="boton-siguiente" onClick={handleSubmit}>Siguiente</button>
    </div>
  );
};

export default Fase1Documentos;
