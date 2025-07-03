import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Fase1Documentos = ({ datos, actualizar, idUsuario }) => {
  const handleChange = e => {
    actualizar({ [e.target.name]: e.target.value });
  };

  const guardar = () => {
    axios.post('http://localhost:3001/api/fase-final/guardar', {
      id_usuario: idUsuario,
      ine_nombre: datos.ine_nombre,
      curp_nombre: datos.curp_nombre,
      acta_nombre: datos.acta_nombre,
      comprobante_domicilio_nombre: datos.comprobante_domicilio_nombre
    }).then(() => {
      Swal.fire('Guardado', 'Documentos guardados correctamente', 'success');
    }).catch(() => {
      Swal.fire('Error', 'No se pudo guardar', 'error');
    });
  };

  return (
    <div className="fase">
      <h3>Sube tus documentos</h3>
      <input type="text" name="ine_nombre" value={datos.ine_nombre || ''} onChange={handleChange} placeholder="Nombre archivo INE" />
      <input type="text" name="curp_nombre" value={datos.curp_nombre || ''} onChange={handleChange} placeholder="Nombre archivo CURP" />
      <input type="text" name="acta_nombre" value={datos.acta_nombre || ''} onChange={handleChange} placeholder="Nombre archivo Acta" />
      <input type="text" name="comprobante_domicilio_nombre" value={datos.comprobante_domicilio_nombre || ''} onChange={handleChange} placeholder="Nombre archivo Domicilio" />
      <button className="boton-icono" onClick={guardar}><i className="fas fa-file-upload"></i> Guardar Documentos
      </button>

    </div>
  );
};

export default Fase1Documentos;