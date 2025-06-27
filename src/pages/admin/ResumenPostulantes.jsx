import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/adminTabla.css';
import { FaFilePdf, FaFileExcel } from 'react-icons/fa';

const ResumenPostulantes = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/resumen/resumen-postulados')
      .then(res => setUsuarios(res.data))
      .catch(err => console.error('Error al cargar resumen de postulantes:', err));
  }, []);

  return (
    <div className="contenido-admin">
      <Header />
      <Sidebar />

      <div className="encabezado-tabla">
        <h2 className="titulo-tabla">Resumen de Postulantes</h2>
        <div className="botones-exportar">
          <button className="btn-pdf">
            <FaFilePdf /> PDF
          </button>
          <button className="btn-excel">
            <FaFileExcel /> Excel
          </button>
        </div>
      </div>

      <div className="tabla-responsive">
        <table className="tabla-admin">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Carrera</th>
              <th>Universidad</th>
              <th>CV</th>
              <th>Área Final</th>
              <th>Subárea</th>
              <th>Proyecto Final</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u, index) => (
              <tr key={index}>
                <td>{u.nombre}</td>
                <td>{u.correo}</td>
                <td>{u.telefono}</td>
                <td>{u.carrera}</td>
                <td>{u.universidad}</td>
                <td>
                  <a
                    href={`http://localhost:3001/uploads/${u.cv_nombre}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver CV
                  </a>
                </td>
                <td>{u.area_final}</td>
                <td>{u.subarea_especifica}</td>
                <td>{u.proyecto_asignado_final}</td>
                <td className={u.estado_seleccion === 'Aceptado' ? 'estado-verde' : 'estado-rojo'}>
                  {u.estado_seleccion}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
};

export default ResumenPostulantes;
