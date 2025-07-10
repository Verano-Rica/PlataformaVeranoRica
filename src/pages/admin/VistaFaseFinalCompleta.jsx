import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/vistaFaseFinal.css'; 

const VistaFaseFinalCompleta = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/fasefinal/vista/completa')
      .then((res) => setDatos(res.data))
      .catch((err) => console.error('Error al obtener los datos:', err));
  }, []);

  return (
    <div className="contenedor-fase-final">
      <h2>Fase Final Completa</h2>
      <table className="tabla-fase-final">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido P.</th>
            <th>Apellido M.</th>
            <th>Correo</th>
            <th>INE</th>
            <th>CURP</th>
            <th>Acta</th>
            <th>Comprobante</th>
            <th>Talla</th>
            <th>Inicio</th>
            <th>Fin</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((fila) => (
            <tr key={fila.id}>
              <td>{fila.id}</td>
              <td>{fila.nombre}</td>
              <td>{fila.apellido_paterno}</td>
              <td>{fila.apellido_materno}</td>
              <td>{fila.correo}</td>
              <td>{fila.ine_nombre}</td>
              <td>{fila.curp_nombre}</td>
              <td>{fila.acta_nombre}</td>
              <td>{fila.comprobante_domicilio_nombre}</td>
              <td>{fila.talla_playera}</td>
              <td>{fila.disponible_inicio?.slice(0, 10)}</td>
              <td>{fila.disponible_fin?.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VistaFaseFinalCompleta;
