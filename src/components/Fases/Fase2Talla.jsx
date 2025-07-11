import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import '../../styles/fasesProceso.css';

const Fase2Talla = ({ datos, actualizar, idUsuario, actualizarEstado }) => {
  const [talla, setTalla] = useState('');

  useEffect(() => {
    if (datos?.talla_playera) {
      setTalla(datos.talla_playera);
    }
  }, [datos]);

  const guardarTalla = async () => {
    if (!talla) {
      Swal.fire('Error', 'Selecciona una talla antes de guardar.', 'error');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('id_usuario', idUsuario);
      formData.append('talla_playera', talla);

      const res = await fetch('http://localhost:3001/api/fasefinal/guardar', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        Swal.fire('Éxito', 'Talla guardada correctamente.', 'success');
        actualizar({ talla_playera: talla });
        actualizarEstado(); // ✅ actualiza la línea del tiempo
      } else {
        Swal.fire('Error', 'Ocurrió un error al guardar.', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Error de conexión al servidor.', 'error');
    }
  };

  return (
    <div className="contenedor-fase fase2">
      <h3 className="titulo-fase">Fase 2: Selección de Talla de Playera</h3>
      <select value={talla} onChange={(e) => setTalla(e.target.value)} className="select-talla">
        <option value="">Selecciona una talla</option>
        <option value="XS">XS</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>
      <button onClick={guardarTalla} className="btn-guardar-fase">
        Guardar Talla
      </button>
    </div>
  );
};

export default Fase2Talla;
