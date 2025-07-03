import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Fase3Disponibilidad = ({ datos, actualizar, idUsuario }) => {
  const handleChange = e => {
    actualizar({ [e.target.name]: e.target.value });
  };

  const guardar = () => {
    axios.post('http://localhost:3001/api/fase-final/guardar', {
      id_usuario: idUsuario,
      disponible_inicio: datos.disponible_inicio,
      disponible_fin: datos.disponible_fin
    }).then(() => {
      Swal.fire('Guardado', 'Disponibilidad registrada correctamente', 'success');
    }).catch(() => {
      Swal.fire('Error', 'No se pudo guardar', 'error');
    });
  };

  return (
    <div className="fase">
      <h3>Confirma tu disponibilidad</h3>
      <input type="date" name="disponible_inicio" value={datos.disponible_inicio || ''} onChange={handleChange} />
      <input type="date" name="disponible_fin" value={datos.disponible_fin || ''} onChange={handleChange} />
      <button onClick={guardar}>Guardar</button>
    </div>
  );
};

export default Fase3Disponibilidad;