import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Fase4Psicometrico = ({ datos, actualizar, idUsuario }) => {
  const handleChange = e => {
    actualizar({ evaluaciones_completadas: e.target.checked });
  };

  const guardar = () => {
    axios.post('http://localhost:3001/api/fase-final/guardar', {
      id_usuario: idUsuario,
      evaluaciones_completadas: datos.evaluaciones_completadas
    }).then(() => {
      Swal.fire('Guardado', 'Confirmación registrada correctamente', 'success');
    }).catch(() => {
      Swal.fire('Error', 'No se pudo guardar', 'error');
    });
  };

  return (
    <div className="fase">
      <h3>¿Has realizado tus exámenes psicométricos?</h3>
      <label>
        <input type="checkbox" name="evaluaciones_completadas" checked={datos.evaluaciones_completadas || false} onChange={handleChange} />
        Sí, he completado mis evaluaciones
      </label>
      <button className="boton-icono" onClick={guardar}><i className="fas fa-brain"></i> Confirmar Evaluaciones</button>

    </div>
  );
};

export default Fase4Psicometrico;