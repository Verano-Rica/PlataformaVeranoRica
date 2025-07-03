import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Fase2Talla = ({ datos, actualizar, idUsuario }) => {
  const handleChange = e => {
    actualizar({ talla_playera: e.target.value });
  };

  const guardar = () => {
    axios.post('http://localhost:3001/api/fase-final/guardar', {
      id_usuario: idUsuario,
      talla_playera: datos.talla_playera
    }).then(() => {
      Swal.fire('Guardado', 'Talla registrada correctamente', 'success');
    }).catch(() => {
      Swal.fire('Error', 'No se pudo guardar', 'error');
    });
  };

  return (
    <div className="fase">
      <h3>Selecciona tu talla de playera</h3>
      <select name="talla_playera" value={datos.talla_playera || ''} onChange={handleChange}>
        <option value="">Selecciona una talla</option>
        <option value="XS">XS</option>
        <option value="CH">CH</option>
        <option value="M">M</option>
        <option value="G">G</option>
      </select>
      <button className="boton-icono" onClick={guardar}><i className="fas fa-tshirt"></i> Guardar Talla
</button>

    </div>
  );
};

export default Fase2Talla;