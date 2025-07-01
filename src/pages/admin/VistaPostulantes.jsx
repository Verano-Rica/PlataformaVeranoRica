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


const VistaPostulantes = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/resumen/resumen-postulados')
      .then(res => setUsuarios(res.data))
      .catch(err => console.error('Error al cargar resumen de postulantes:', err));
  }, []);

  const exportarExcel = () => {
    const datos = usuarios.map(u => ({
      Nombre: u.nombre,
      Correo: u.correo,
      Teléfono: u.telefono,
      Carrera: u.carrera,
      Universidad: u.universidad,
      'CV': u.cv_nombre || '-',
      'Área Final': u.area_final || '-',
      Subárea: u.subarea_especifica || '-',
      'Proyecto Final': u.proyecto_asignado_final || '-',
      Estado: u.estado_seleccion || '-'
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
      'Nombre', 'Correo', 'Teléfono', 'Carrera', 'Universidad',
      'CV', 'Área Final', 'Subárea', 'Proyecto Final', 'Estado'
    ];

    const filas = usuarios.map(u => [
      u.nombre,
      u.correo,
      u.telefono || '-',
      u.carrera || '-',
      u.universidad || '-',
      u.cv_nombre || '-',
      u.area_final || '-',
      u.subarea_especifica || '-',
      u.proyecto_asignado_final || '-',
      u.estado_seleccion || '-'
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
        <Header />

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
                      <td>{u.nombre}</td>
                      <td>{u.correo}</td>
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
                      <td className={u.estado_seleccion === 'Aceptado' ? 'estado-verde' : 'estado-rojo'}>
                        {u.estado_seleccion}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default VistaPostulantes;
