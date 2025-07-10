import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../../styles/fasesProceso.css';
import { FaSave } from 'react-icons/fa'; // al inicio del archivo

const Fase1Documentos = ({ idUsuario, actualizar }) => {
  const [cv, setCv] = useState(null);
  const [ine, setIne] = useState(null);
  const [curp, setCurp] = useState(null);
  const [acta, setActa] = useState(null);
  const [comprobante, setComprobante] = useState(null);

  const handleSubmit = async () => {
    if (!cv || !ine || !curp || !acta || !comprobante) {
      Swal.fire({
        icon: 'error',
        title: 'Faltan documentos',
        text: 'Por favor, sube todos los documentos antes de continuar.',
      });
      return;
    }

    const formData = new FormData();
    formData.append('id_usuario', idUsuario);
    formData.append('cv', cv);
    formData.append('identificacion', ine);
    formData.append('curp', curp);
    formData.append('actaNacimiento', acta);
    formData.append('comprobanteDomicilio', comprobante);

    try {
      const res = await fetch(`http://localhost:3001/api/fasefinal/documentos/${idUsuario}`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Documentos guardados',
          showConfirmButton: false,
          timer: 1500,
        });
        actualizar({ documentosSubidos: true });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar',
          text: 'Intenta nuevamente.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudo conectar con el servidor.',
      });
    }
  };

  return (
    <div className="contenedor-documentos">
      <h3 className="titulo-subir">Subir documentos</h3>

      {[
        { num: 1, label: 'CV', onChange: setCv },
        { num: 2, label: 'IDENTIFICACIÓN', onChange: setIne },
        { num: 3, label: 'CURP', onChange: setCurp },
        { num: 4, label: 'ACTA DE NACIMIENTO', onChange: setActa },
        { num: 5, label: 'COMPROBANTE DE DOMICILIO', onChange: setComprobante }
      ].map((item) => (
        <div className="campo-doc" key={item.num}>
          <span className="numero-circulo">{item.num}</span>
          <label className="label-documento">{item.label}:</label>
          <input type="file" className="input-documento" onChange={(e) => item.onChange(e.target.files[0])} />
        </div>
        
      ))}

<div className="contenedor-boton-guardar">
  <button className="boton-siguiente" onClick={handleSubmit}>
    <FaSave style={{ marginRight: '8px' }} />
    Guardar
  </button>
</div>
    </div>
  );
};

export default Fase1Documentos;
