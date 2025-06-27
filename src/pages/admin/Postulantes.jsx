import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/adminTabla.css';
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';

const proyectosDisponibles = [
  'Desarrollo Web', 'Relaciones Laborales', 'Control de Calidad',
  'Innovación de Productos', 'Sustentabilidad', 'Finanzas Rurales',
  'Logística', 'Automatización'
];

const Postulantes = () => {
  const [postulantes, setPostulantes] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [areas, setAreas] = useState([]);
  const [filtroArea, setFiltroArea] = useState('');
  const [filtroProyecto, setFiltroProyecto] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/postulantes')
      .then(res => res.json())
      .then(data => {
        setPostulantes(data);
        setFiltrados(data);
      });

    fetch('http://localhost:3001/api/areas')
      .then(res => res.json())
      .then(data => setAreas(data));
  }, []);

  useEffect(() => {
    let resultado = postulantes;
    if (filtroArea) resultado = resultado.filter(p => p.area_id == filtroArea);
    if (filtroProyecto) {
      resultado = resultado.filter(
        p => p.proyecto1 === filtroProyecto ||
             p.proyecto2 === filtroProyecto ||
             p.otro_proyecto === filtroProyecto
      );
    }
    setFiltrados(resultado);
  }, [filtroArea, filtroProyecto, postulantes]);

  const exportarExcel = () => {
    const hoja = utils.json_to_sheet(filtrados);
    const libro = utils.book_new();
    utils.book_append_sheet(libro, hoja, 'Postulantes');
    writeFile(libro, 'postulantes.xlsx');
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text('Postulantes Registrados', 14, 15);
    const columnas = [
      'ID', 'Nombre', 'Universidad', 'Carrera', 'Semestre', 'Correo', 'Teléfono',
      'Área', 'Otra Área', 'Proyecto 1', 'Proyecto 2', 'Otro Proyecto'
    ];
    const filas = filtrados.map(p => [
      p.id_usuario,
      `${p.nombre} ${p.apellido_paterno} ${p.apellido_materno}`,
      p.universidad,
      p.carrera,
      p.semestre,
      p.correo,
      p.telefono,
      p.area_id,
      p.otra_area_interes || '-',
      p.proyecto1 || '-',
      p.proyecto2 || '-',
      p.otro_proyecto || '-'
    ]);
    doc.autoTable({ head: [columnas], body: filas, startY: 20 });
    doc.save('postulantes.pdf');
  };

  return (
    <div className="panel-container">
      <Sidebar />
      <div className="panel-contenido">
        <Header nombre='Bienvenido administrador(a)' />
        <main className="main-contenido">
          <div className="tabla-box">
            <h2 className="titulo-tabla">📋 Postulantes Registrados</h2>

            <div className="filtros">
              <select value={filtroArea} onChange={e => setFiltroArea(e.target.value)}>
                <option value="">Filtrar por área</option>
                {areas.map(area => (
                  <option key={area.id} value={area.id}>{area.nombre}</option>
                ))}
              </select>

              <select value={filtroProyecto} onChange={e => setFiltroProyecto(e.target.value)}>
                <option value="">Filtrar por proyecto</option>
                {proyectosDisponibles.map((p, i) => (
                  <option key={i} value={p}>{p}</option>
                ))}
              </select>

              <button className="btn-exportar" onClick={exportarPDF}>Exportar PDF</button>
              <button className="btn-exportar" onClick={exportarExcel}>Exportar Excel</button>
            </div>

            <div className="tabla-responsive">
              <table className="tabla-admin">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Universidad</th>
                    <th>Carrera</th>
                    <th>Semestre</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th>Área (ID)</th>
                    <th>Otra Área</th>
                    <th>Proyecto 1</th>
                    <th>Proyecto 2</th>
                    <th>Otro Proyecto</th>
                    <th>CV</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrados.map((u) => (
                    <tr key={u.id_usuario}>
                      <td>{u.id_usuario}</td>
                      <td>
                        <button
                          className="btn-ver"
                          onClick={() => navigate(`/admin/seleccion/${u.id_usuario}`)}
                        >
                          {`${u.nombre} ${u.apellido_paterno} ${u.apellido_materno}`}
                        </button>
                      </td>
                      <td>{u.universidad}</td>
                      <td>{u.carrera}</td>
                      <td>{u.semestre}</td>
                      <td>{u.correo}</td>
                      <td>{u.telefono}</td>
                      <td>{u.area_id}</td>
                      <td>{u.otra_area_interes || '-'}</td>
                      <td>{u.proyecto1 || '-'}</td>
                      <td>{u.proyecto2 || '-'}</td>
                      <td>{u.otro_proyecto || '-'}</td>
                      <td>
                        {u.cv_nombre ? (
                          <a
                            className="btn-ver"
                            href={`http://localhost:3001/uploads/${u.cv_nombre}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Ver CV
                          </a>
                        ) : ('-')}
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

export default Postulantes;
