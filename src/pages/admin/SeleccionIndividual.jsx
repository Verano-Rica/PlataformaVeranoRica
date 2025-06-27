import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/proceso_seleccion.css';
import { FaCheckCircle, FaTimesCircle, FaArrowLeft } from 'react-icons/fa';

const SeleccionIndividual = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(undefined);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/admin/seleccionados`)
      .then(res => {
        const encontrado = res.data.find(u => u.id_usuario == id);
        setUsuario(encontrado || null);
      })
      .catch(err => {
        console.error('Error al cargar usuario:', err);
        setUsuario(null);
      });

    axios.get('http://localhost:3001/api/areas')
      .then(res => setAreas(res.data))
      .catch(err => console.error('Error al cargar áreas:', err));
  }, [id]);

  const handleChange = (campo, valor) => {
    setUsuario(prev => ({ ...prev, [campo]: valor }));
  };

  const guardarCambios = (estadoFinal) => {
    // Convertir campos vacíos a null
    let area_final_id = usuario.area_final_id || null;
    let subarea_especifica = usuario.subarea_especifica?.trim() || null;
    let proyecto_asignado_final = usuario.proyecto_asignado_final?.trim() || null;

    if (estadoFinal === 4) {
      if (!area_final_id || !subarea_especifica || !proyecto_asignado_final) {
        alert('Por favor llena todos los campos para aceptar al usuario');
        return;
      }
    } else if (estadoFinal === 9) {
      // Si es rechazo, campos vacíos
      area_final_id = null;
      subarea_especifica = null;
      proyecto_asignado_final = null;
    }

    axios.put(`http://localhost:3001/api/admin/seleccionados/actualizar/${usuario.id_usuario}`, {
      area_final_id,
      subarea_especifica,
      proyecto_asignado_final,
      estado_seleccion: estadoFinal
    })
      .then(() => {
        const msg = estadoFinal === 4 ? '✔ Usuario aceptado correctamente' : '✖ Usuario rechazado correctamente';
        alert(msg);
        navigate('/admin/usuarios-seleccionados'); // redireccionar de vuelta
      })
      .catch(() => alert('❌ Error al guardar cambios'));
  };

  // Mostrar mientras carga
  if (usuario === undefined) {
    return (
      <div className="panel-contenido">
        <p style={{ textAlign: 'center', paddingTop: '50px', fontSize: '18px' }}>Cargando usuario...</p>
      </div>
    );
  }

  // Mostrar si el usuario no existe
  if (usuario === null) {
    return (
      <div className="admin-panel">
        <Sidebar />
        <div className="contenido-principal">
          <Header titulo="Seleccionar Usuario" />
          <div className="tabla-contenedor">
            <h2 className="titulo-seccion">⚠ Usuario no encontrado</h2>
            <p style={{ textAlign: 'center', fontSize: '16px', marginTop: '20px' }}>
              El usuario con ID <strong>{id}</strong> no existe o no ha sido registrado aún.
            </p>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button className="btn-rechazar" onClick={() => navigate('/admin/usuarios-seleccionados')}>
                <FaArrowLeft style={{ marginRight: '6px' }} /> Regresar
              </button>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <Sidebar />
      <div className="contenido-principal">
        <Header titulo="Seleccionar Usuario" />

        <div className="tabla-contenedor">
          <h2 className="titulo-seccion">Decisión Final del Postulante</h2>

          <table className="tabla-detalle">
            <tbody>
              <tr>
                <td>Nombre completo:</td>
                <td>{usuario.nombre} {usuario.apellido_paterno} {usuario.apellido_materno}</td>
              </tr>
              <tr>
                <td>Correo:</td>
                <td>{usuario.correo}</td>
              </tr>
              <tr>
                <td>Teléfono:</td>
                <td>{usuario.telefono}</td>
              </tr>
              <tr>
                <td>Área seleccionada en formulario:</td>
                <td>{usuario.nombre_area_formulario || '-'}</td>
              </tr>
              <tr>
                <td>Área Final:</td>
                <td>
                  <select
                    value={usuario.area_final_id || ''}
                    onChange={e => handleChange('area_final_id', e.target.value)}
                  >
                    <option value="">Selecciona</option>
                    {areas.map(area => (
                      <option key={area.id} value={area.id}>{area.nombre}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>Subárea específica:</td>
                <td>
                  <input
                    type="text"
                    value={usuario.subarea_especifica || ''}
                    onChange={e => handleChange('subarea_especifica', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Proyecto asignado final:</td>
                <td>
                  <input
                    type="text"
                    value={usuario.proyecto_asignado_final || ''}
                    onChange={e => handleChange('proyecto_asignado_final', e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="acciones">
            <button className="btn-aceptar" onClick={() => guardarCambios(4)}>
              <FaCheckCircle /> Aceptar
            </button>
            <button className="btn-rechazar" onClick={() => guardarCambios(9)}>
              <FaTimesCircle /> Rechazar
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default SeleccionIndividual;
