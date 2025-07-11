import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BotonRedondo from '../../components/BotonRedondo';
import { FaHome, FaArrowCircleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../../styles/agendados.css';
import axios from 'axios';
import { FaFilePdf } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';




const UsuariosFaseFinal = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  useEffect(() => {
    axios.get('http://localhost:3001/api/fasefinalcompletada')
      .then(res => setUsuarios(res.data))
      .catch(err => console.error('Error al cargar datos de fase final:', err));
  }, []);

  const exportarExcel = () => {
    const data = usuarios.map(u => ({
      Nombre: u.nombre_completo,
      Correo: u.correo,
      INE: u.ine_postulante,
      CURP: u.curp_postulante,
      Acta: u.acta_postulante,
      Comprobante: u.comprobante_domicilio_postulante,
      Talla: u.talla_playera,
      Disponibilidad: u.disponibilidad_general,
      Comentarios: u.comentarios_adicionales,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'FaseFinal');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'usuarios_fase_final.xlsx');
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Usuarios con Registro Finalizado', 14, 20);

    const columns = ["Nombre", "Correo", "INE", "CURP", "Acta", "Comprobante", "Talla", "Disponibilidad"];
    const rows = usuarios.map(u => [
      u.nombre_completo, u.correo, u.ine_postulante, u.curp_postulante, u.acta_postulante,
      u.comprobante_domicilio_postulante, u.talla_playera, u.disponibilidad_general
    ]);

    autoTable(doc, { head: [columns], body: rows, startY: 30, theme: 'striped' });
    doc.save('usuarios_fase_final.pdf');
  };

  return (
    <div className="panel-container">
      <Sidebar menuAbierto={menuAbierto} toggleMenu={toggleMenu} />
      <div className="panel-contenido">
        <Header
          nombre={<span><span className="programa-normal">Programa </span><span className="verano-negritas">VERANO RICA</span></span>}
          toggleMenu={toggleMenu}
          handleLogout={handleLogout}
        />

        <main className="main-contenido">
          <h2 className="titulo-usuarios">Usuarios con Fase Final Completada</h2>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <button onClick={exportarExcel} className="btn-exportar" style={{ marginRight: '10px' }}>
              Exportar a Excel
            </button>
            <button onClick={exportarPDF} className="btn-exportar">
              Exportar a PDF
            </button>
          </div>

          <table className="tabla-usuarios">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>INE</th>
                <th>CURP</th>
                <th>Acta</th>
                <th>Comprobante</th>
                <th>Talla</th>
                <th>Disponibilidad</th>
                <th>Comentarios</th>
                <th>CV</th>
                <th>Notificar</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(u => (
                <tr key={u.id_usuario}>
                  <td>{u.nombre_completo}</td>
                  <td>{u.correo}</td>
                  <td style={{ textAlign: 'center' }}>
  {u.ine_postulante ? (
    <a href={`http://localhost:3001/uploads/fase_final/${u.ine_postulante}`} target="_blank" rel="noopener noreferrer" title="Ver INE">
      <FaFilePdf style={{ color: '#878787', fontSize: '20px' }} />
    </a>
  ) : '—'}
</td>

<td style={{ textAlign: 'center' }}>
  {u.curp_postulante ? (
    <a href={`http://localhost:3001/uploads/fase_final/${u.curp_postulante}`} target="_blank" rel="noopener noreferrer" title="Ver CURP">
      <FaFilePdf style={{ color: '#878787', fontSize: '20px' }} />
    </a>
  ) : '—'}
</td>

<td style={{ textAlign: 'center' }}>
  {u.acta_postulante ? (
    <a href={`http://localhost:3001/uploads/fase_final/${u.acta_postulante}`} target="_blank" rel="noopener noreferrer" title="Ver Acta">
      <FaFilePdf style={{ color: '#878787', fontSize: '20px' }} />
    </a>
  ) : '—'}
</td>

<td style={{ textAlign: 'center' }}>
  {u.comprobante_domicilio_postulante ? (
    <a href={`http://localhost:3001/uploads/fase_final/${u.comprobante_domicilio_postulante}`} target="_blank" rel="noopener noreferrer" title="Ver Comprobante">
      <FaFilePdf style={{ color: '#878787', fontSize: '20px' }} />
    </a>
  ) : '—'}
</td>
        
                  <td style={{ textAlign: 'center' }}>{u.talla_playera}</td>
                  <td style={{ textAlign: 'center' }}>{u.disponibilidad_general}</td>
                  <td style={{ textAlign: 'center' }}>{u.comentarios_adicionales || '-'}</td>
                  <td style={{ textAlign: 'center' }}>
  {u.cv_archivo ? (
    <a href={`http://localhost:3001/uploads/${u.cv_archivo}`} target="_blank" rel="noopener noreferrer" title="Ver CV">
      <FaFilePdf style={{ color: '878787', fontSize: '20px' }} />
    </a>
  ) : '—'}
</td>
<td style={{ textAlign: 'center' }}>
  <a
    href={`https://mail.google.com/mail/?view=cm&to=${u.correo}&su=Evaluaciones%20psicométricas%20y%20documentos%20pendientes&body=${encodeURIComponent(`Buenos días ${u.nombre_completo}, a continuación te comparto tus evaluaciones y es importante que puedas reunir los demás documentos por favor.

Te comparto la primer evaluación:
Proporciona al examinado una contraseña para su prueba en la siguiente dirección:
https://podium.midot.com/am/
Contraseña: afeqw5

Te comparto la segunda evaluación:
Hola. Tal como lo platicamos, te dejo las instrucciones para que puedas aplicar los siguientes pasos y comenzar el proceso de selección con nosotros.

Te recomiendo lo siguiente:

- Apagar el celular
- Evitar interrupciones
- Tener internet fluido
- Evita hacer las evaluaciones en un equipo móvil

Inicia el proceso de selección con nosotros, siguiendo estas instrucciones:

1. Ingresa a https://evaluatest.com/Core/Evaluate/IUEvaluacion/HomeLoginCandidatos.asp
2. Presiona el botón de "Registrarse"
3. Ingresa los datos que te soliciten
4. Localiza el botón que dice “Ingresar” y da click
5. El sistema te pedirá un código y deberás colocar el siguiente:

becprimerempleo2025

6. Realiza las evaluaciones que el sistema te solicita hasta que todas tengan el estatus de “Finalizado”
7. Confirma que terminaste la evaluación

Sigo a tus órdenes para lo que requieras.

Saludos.`)}`}
    target="_blank"
    rel="noopener noreferrer"
    title="Enviar correo por Gmail"
  >
    <FaBell style={{ color: '#878787', fontSize: '20px' }} />
  </a>
</td>


                </tr>
              ))}
            </tbody>
          </table>

          <div className="iconos-body">
            <div className="home-body-centrado">
              <BotonRedondo icono={<FaHome />} ariaLabel="Inicio" onClick={() => navigate('/admin')} />
            </div>
            <div className="flecha-body-izquierda">
              <BotonRedondo icono={<FaArrowCircleLeft />} ariaLabel="Volver" onClick={() => navigate(-1)} />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default UsuariosFaseFinal;
