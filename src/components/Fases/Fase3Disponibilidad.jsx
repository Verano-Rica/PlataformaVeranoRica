import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import '../../styles/fase3.css';

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_usuario: idUsuario,
          disponibilidad_general: disponibilidad,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire('Éxito', data.message, 'success');
        actualizar({ disponibilidad_general: disponibilidad });
        setTimeout(() => window.location.reload(), 1500);
      } else {
        Swal.fire('Error', data.error || 'Error al guardar', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Error de conexión al guardar', 'error');
    }
  };

  return (
    <div className="fase3-container">
      <div className="fase3-content">
        <div className="titulo-izquierda">
          <h2>Confirmación de asistencia</h2>
        </div>

        <div className="contenido-formulario">
          <p className="pregunta">
            ¿Estás disponible durante todo el periodo del programa?
          </p>

          <select
            value={disponibilidad}
            onChange={(e) => setDisponibilidad(e.target.value)}
            className="select-disponibilidad-moqups"
          >
            <option value="">Selecciona una opción</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
            <option value="Parcialmente">Parcialmente</option>
          </select>

          <p className="texto-aclaracion">
            En caso de no contar con disponibilidad completa, por favor indícanos los motivos (escuela o compromisos personales). Esta información es importante para nosotros.
          </p>

          <textarea
            className="comentarios"
            placeholder="Escribe los detalles aquí..."
          ></textarea>

          <button onClick={guardarDisponibilidad} className="btn-siguiente">
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fase3Disponibilidad;
