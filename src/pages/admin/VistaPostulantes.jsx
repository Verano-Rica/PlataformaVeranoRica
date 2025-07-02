import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/VistaPostulantes.css';
import { FaFilePdf, FaFileExcel } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import BotonRedondo from '../../components/BotonRedondo';
import { FaHome, FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';

const VistaPostulantes = () => {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/resumen/resumen-postulados')
      .then(res => setUsuarios(res.data))
      .catch(err => console.error('Error al cargar resumen de postulantes:', err));
  }, []);

  const exportarExcel = () => {
    const datos = usuarios.map(u => ({
      Nombre: `${u.nombre} ${u.apellido_paterno || ''} ${u.apellido_materno || ''}`,
      Correo: u.correo,
      Estado: u.estado_seleccion || '-',
      Teléfono: u.telefono || '-',
      Carrera: u.carrera || '-',
      Universidad: u.universidad || '-',
      CV: u.cv_nombre || '-',
      'Área Final': u.area_final || '-',
      Subárea: u.subarea_especifica || '-',
      'Proyecto Final': u.proyecto_asignado_final || '-'
    }));

    const hoja = XLSX.utils.json_to_sheet(datos);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, 'Postulantes');
    const excelBuffer = XLSX.write(libro, { bookType: 'xlsx', type: 'array' });
    const archivo = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(archivo, 'resumen_postulantes.xlsx');
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text('Resumen de Postulantes', 14, 15);

    const columnas = [
      'Nombre', 'Correo', 'Estado', 'Teléfono', 'Carrera',
      'Universidad', 'CV', 'Área Final', 'Subárea', 'Proyecto Final'
    ];

    const filas = usuarios.map(u => [
      `${u.nombre} ${u.apellido_paterno || ''} ${u.apellido_materno || ''}`,
      u.correo,
      u.estado_seleccion || '-',
      u.telefono || '-',
      u.carrera || '-',
      u.universidad || '-',
      u.cv_nombre || '-',
      u.area_final || '-',
      u.subarea_especifica || '-',
      u.proyecto_asignado_final || '-'
    ]);

    autoTable(doc, {
      head: [columnas],
      body: filas,
      startY: 20,
      styles: { fontSize: 9 }
    });

    doc.save('resumen_postulantes.pdf');
  };

  return (
    <div className="panel-container">
      <Sidebar />
      <div className="panel-contenido">
                <Header
  nombre={
    <span className="titulo-header-unido">
      <span className="programa-normal">Programa </span>
      <span className="verano-negritas">VERANO RICA</span>
    </span>
  }
/>

        <main className="main-contenido">
          <div className="tabla-box">
            <div className="encabezado-tabla">
              <h2 className="titulo-tabla">Resumen de Postulantes</h2>
              <div className="botones-exportar">
                <button className="btn-exportar" onClick={exportarPDF}><FaFilePdf /> PDF</button>
                <button className="btn-exportar" onClick={exportarExcel}><FaFileExcel /> Excel</button>
              </div>
            </div>

            <div className="tabla-responsive">
              <table className="tabla-admin">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Estado</th>
                    <th>Teléfono</th>
                    <th>Carrera</th>
                    <th>Universidad</th>
                    <th>CV</th>
                    <th>Área Final</th>
                    <th>Subárea</th>
                    <th>Proyecto Final</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((u, index) => (
                    <tr key={index}>
                      <td>{`${u.nombre} ${u.apellido_paterno || ''} ${u.apellido_materno || ''}`}</td>
                      <td>{u.correo}</td>
                      <td className={u.estado_seleccion === 'Aceptado' ? 'estado-verde' : 'estado-rojo'}>
                        {u.estado_seleccion}
                      </td>
                      <td>{u.telefono}</td>
                      <td>{u.carrera}</td>
                      <td>{u.universidad}</td>
                      <td>
                        {u.cv_nombre ? (
                          <a
                            href={`http://localhost:3001/uploads/${u.cv_nombre}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-ver"
                          >
                            Ver CV
                          </a>
                        ) : ('-')}
                      </td>
                      <td>{u.area_final}</td>
                      <td>{u.subarea_especifica}</td>
                      <td>{u.proyecto_asignado_final}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div> 
              <br />
  <br />
   <br />
            </div> 
           <div className="home-body-centrado">
            <BotonRedondo icono={<FaHome />} ariaLabel="Inicio" onClick={() => navigate('/admin')} />
          </div>
        </main>

        <Footer 
        />
      </div>
    </div>
  );
};

export default VistaPostulantes;
