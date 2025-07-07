import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import '../../styles/fasesProceso.css';

const Fase3Disponibilidad = ({ datos, actualizar, idUsuario }) => {
  const [disponibilidad, setDisponibilidad] = useState('');

  useEffect(() => {
    if (datos?.disponibilidad_general) {
      setDisponibilidad(datos.disponibilidad_general);
    }
  }, [datos]);

  const guardarDisponibilidad = async () => {
    if (!disponibilidad) {
      Swal.fire('Error', 'Por favor selecciona tu disponibilidad.', 'error');
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/api/fasefinal/disponibilidad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_usuario: idUsuario,
          disponibilidad_general: disponibilidad,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire('Éxito', data.message, 'success');
        actualizar({ disponibilidad_general: disponibilidad });
        setTimeout(() => window.location.reload(), 1500); // Forzar recarga para avanzar a Fase 4
      } else {
        Swal.fire('Error', data.error || 'Error al guardar', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Error de conexión al guardar', 'error');
    }
  };

  return (
    <div className="contenedor-fase fase3">
      <h3 className="titulo-fase">Fase 3: Confirmación de Disponibilidad</h3>
      <select
        value={disponibilidad}
        onChange={(e) => setDisponibilidad(e.target.value)}
        className="select-disponibilidad"
      >
        <option value="">Selecciona una opción</option>
        <option value="Disponible todas las semanas">Disponible todas las semanas</option>
        <option value="Solo algunas semanas">Solo algunas semanas</option>
        <option value="No estoy disponible">No estoy disponible</option>
      </select>
      <button onClick={guardarDisponibilidad} className="btn-guardar-fase">
        Guardar Disponibilidad
      </button>
    </div>
  );
};

export default Fase3Disponibilidad;
