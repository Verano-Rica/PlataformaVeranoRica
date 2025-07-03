import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../styles/agendados.css';
import BotonRedondo from '../../components/BotonRedondo';
import {FaHome, FaArrowCircleRight, FaCheckCircle, FaTimesCircle, FaArrowCircleLeft} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const UsuariosAgendados = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [bloqueSeleccionado, setBloqueSeleccionado] = useState('');

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const cargarUsuarios = () => {
    axios.get('http://localhost:3001/api/usuarios/agendados')
      .then(res => setUsuarios(res.data))
      .catch(err => console.error('Error al cargar usuarios agendados:', err));
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cancelarEntrevista = (idUsuario) => {
    if (!window.confirm('¿Estás segura de cancelar esta entrevista?')) return;

    axios.delete(`http://localhost:3001/api/usuarios/agendados/${idUsuario}`)
      .then(() => {
        alert('Entrevista cancelada correctamente');
        cargarUsuarios();
      })
      .catch(err => {
        console.error('Error al cancelar entrevista:', err);
        alert('Hubo un error al cancelar la entrevista');
      });
  };

  const usuariosFiltrados = bloqueSeleccionado
    ? usuarios.filter(user => user.nombre_bloque === bloqueSeleccionado)
    : usuarios;

  const exportarExcel = () => {
    const data = usuariosFiltrados.map(user => ({
      Nombre: `${user.nombre} ${user.apellido_paterno} ${user.apellido_materno}`,
      Correo: user.correo,
      Fecha: new Date(user.fecha_entrevista).toLocaleDateString('es-MX'),
      Bloque: user.nombre_bloque,
      Proyecto1: user.proyecto1,
      Proyecto2: user.proyecto2,
      OtroProyecto: user.otro_proyecto || '-',
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Agendados');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `agendados-${bloqueSeleccionado || 'todos'}.xlsx`);
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Reporte de Entrevistas Agendadas', 14, 20);

    const columns = ["Nombre", "Correo", "Fecha", "Bloque", "Proyecto 1", "Proyecto 2", "Otro Proyecto"];
    const rows = usuariosFiltrados.map(user => [
      `${user.nombre} ${user.apellido_paterno} ${user.apellido_materno}`,
      user.correo,
      new Date(user.fecha_entrevista).toLocaleDateString('es-MX'),
      user.nombre_bloque,
      user.proyecto1,
      user.proyecto2,
      user.otro_proyecto || '-',
    ]);

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 30,
      styles: { fontSize: 10 },
      theme: 'striped',
    });

    doc.save(`reporte-agendados-${bloqueSeleccionado || 'todos'}.pdf`);
  };

  return (
    <div className="panel-container">
      <Sidebar menuAbierto={menuAbierto} toggleMenu={toggleMenu} />
      <div className="panel-contenido">
        <Header
          nombre={
            <span className="titulo-header-unido">
              <span className="programa-normal">Programa </span>
              <span className="verano-negritas">VERANO RICA</span>
            </span>
          }
          toggleMenu={toggleMenu}
          handleLogout={handleLogout}
        />

        <main className="main-contenido">
          <h2 className="titulo-usuarios">Usuarios con Entrevista Agendada</h2>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <select
              value={bloqueSeleccionado}
              onChange={e => setBloqueSeleccionado(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '14px',
                width: '250px',
              }}
            >
              <option value="">-- Mostrar todos los bloques --</option>
              <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
              <option value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</option>
              <option value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</option>
            </select>

            <div>
              <button onClick={exportarExcel} className="btn-exportar" style={{ marginRight: '10px' }}>
                Exportar a Excel
              </button>
              <button onClick={exportarPDF} className="btn-exportar">
                Exportar a PDF
              </button>
            </div>
          </div>

          <table className="tabla-usuarios">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Fecha</th>
                <th>Bloque</th>
                <th>Proyecto 1</th>
                <th>Proyecto 2</th>
                <th>Otro Proyecto</th>
                <th>CV</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map(user => (
                <tr key={user.id}>
                  <td>{user.nombre} {user.apellido_paterno} {user.apellido_materno}</td>
                  <td>{user.correo}</td>
                  <td>{new Date(user.fecha_entrevista).toLocaleDateString('es-MX')}</td>
                  <td>{user.nombre_bloque}</td>
                  <td>{user.proyecto1}</td>
                  <td>{user.proyecto2}</td>
                  <td>{user.otro_proyecto || '-'}</td>
                  <td>
                    {user.cv_nombre ? (
                      <a
                        href={`http://localhost:3001/uploads/${user.cv_nombre}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'blue', textDecoration: 'underline' }}
                      >
                        Ver CV
                      </a>
                    ) : 'No disponible'}
                  </td>
                  <td>
                    <button className="btn-cancelar" onClick={() => cancelarEntrevista(user.id)}>
                      Cancelar
                    </button>
                  </td>
                </tr>
              ))}
              {usuariosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '1rem' }}>
                    No hay entrevistas en este bloque.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Navegación inferior */}
          <div className="iconos-body">
            <div className="home-body-centrado">
              <BotonRedondo icono={<FaHome />} ariaLabel="Inicio" onClick={() => navigate('/admin')} />
            </div>
            <div className="flecha-body-derecha">
              <BotonRedondo icono={<FaArrowCircleRight />} ariaLabel="Siguiente" onClick={() => navigate('/admin/evaluacion/:id')} />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default UsuariosAgendados;
