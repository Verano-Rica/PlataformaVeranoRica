import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import '../../styles/fasesProceso.css';

const Fase1Documentos = ({ datos, actualizar, idUsuario }) => {
  const [archivos, setArchivos] = useState({
    ine_nombre: null,
    curp_nombre: null,
    acta_nombre: null,
    comprobante_domicilio_nombre: null
  });

  const handleArchivo = (e) => {
    const { name, files } = e.target;
    setArchivos({ ...archivos, [name]: files[0] });
  };

  const handleGuardar = async () => {
    const formData = new FormData();
    formData.append('id_usuario', idUsuario);
    Object.entries(archivos).forEach(([clave, archivo]) => {
      if (archivo) formData.append(clave, archivo);
    });

    try {
      const res = await axios.post('http://localhost:3001/api/fase-final/documentos', formData);
      Swal.fire('¡Éxito!', 'Documentos guardados correctamente', 'success');
      actualizar(res.data); // actualiza los datos en pantalla
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'No se pudieron guardar los documentos', 'error');
    }
  };

  return (
    <div className="contenedor-fase">
      <h3 className="titulo-fase">Fase 1 - Subir Documentos</h3>

      <div className="linea-progreso">
        <div className="punto activo" />
        <div className="linea-activa" />
        <div className="punto" />
        <div className="linea" />
        <div className="punto" />
        <div className="linea" />
        <div className="punto" />
      </div>

      <div className="formulario-fase">
        <div className="campo-documento">
          <div className="circle-rojo">1</div>
          <label>CV:</label>
          <input type="file" name="ine_nombre" onChange={handleArchivo} />
        </div>
        <div className="campo-documento">
          <div className="circle-rojo">2</div>
          <label>Identificación:</label>
          <input type="file" name="curp_nombre" onChange={handleArchivo} />
        </div>
        <div className="campo-documento">
          <div className="circle-rojo">3</div>
          <label>CURP:</label>
          <input type="file" name="acta_nombre" onChange={handleArchivo} />
        </div>
        <div className="campo-documento">
          <div className="circle-rojo">4</div>
          <label>Acta de nacimiento:</label>
          <input type="file" name="comprobante_domicilio_nombre" onChange={handleArchivo} />
        </div>
      </div>

      <div className="boton-siguiente">
        <button onClick={handleGuardar}>Siguiente</button>
      </div>
    </div>
  );
};

export default Fase1Documentos;
