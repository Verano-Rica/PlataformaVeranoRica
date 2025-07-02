import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/proceso_seleccion.css';
import BotonRedondo from '../../components/BotonRedondo';
import { FaHome, FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { FaCheckCircle, FaTimesCircle, FaArrowLeft } from 'react-icons/fa';


const SeleccionIndividual = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(undefined);
  const [areas, setAreas] = useState([]);
  const [motivoRechazo, setMotivoRechazo] = useState('');
  const [mostrarMotivo, setMostrarMotivo] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/admin/seleccionados/${id}`)
      .then(res => {
        setUsuario(res.data);
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
    let area_final_id = usuario.area_final_id || null;
    let subarea_especifica = usuario.subarea_especifica?.trim() || null;
    let proyecto_asignado_final = usuario.proyecto_asignado_final?.trim() || null;

    if (estadoFinal === 4) {
      if (!area_final_id || !subarea_especifica || !proyecto_asignado_final) {
        alert('Por favor llena todos los campos para aceptar al usuario');
        return;
      }
    } else if (estadoFinal === 9) {
      if (!motivoRechazo) {
        alert('Por favor selecciona un motivo de rechazo');
        return;
      }
      area_final_id = null;
      subarea_especifica = null;
      proyecto_asignado_final = null;
    }

    axios.put(`http://localhost:3001/api/admin/seleccionados/actualizar/${usuario.id_usuario}`, {
      area_final_id,
      subarea_especifica,
      proyecto_asignado_final,
      estado_seleccion: estadoFinal,
      motivo_rechazo: estadoFinal === 9 ? motivoRechazo : null
    })
      .then(() => {
        const msg = estadoFinal === 4
          ? '✔ Usuario aceptado correctamente'
          : '✖ Usuario rechazado correctamente';
        alert(msg);
        navigate('/admin/postulantes');
      })
      .catch(() => alert('❌ Error al guardar cambios'));
  };

  if (usuario === undefined) {
    return (
      <div className="panel-contenido">
        <p style={{ textAlign: 'center', paddingTop: '50px', fontSize: '18px' }}>Cargando usuario...</p>
      </div>
    );
  }

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
              <button className="btn-rechazar" onClick={() => navigate('/admin/postulantes')}>
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
              {mostrarMotivo && (
                <tr>
                  <td>Motivo del rechazo:</td>
                  <td>
                    <select
                      value={motivoRechazo}
                      onChange={(e) => setMotivoRechazo(e.target.value)}
                    >
                      <option value="">Selecciona un motivo</option>
                      <option value="No cumplió con el perfil">No cumplió con el perfil</option>
                      <option value="No asistió a la entrevista">No asistió a la entrevista</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="acciones">
            <button className="btn-aceptar" onClick={() => guardarCambios(4)}>
              <FaCheckCircle /> Aceptar
            </button>
            <button
              className="btn-rechazar"
              onClick={() => setMostrarMotivo(true)}
              style={{ marginLeft: '10px' }}
            >
              <FaTimesCircle /> Rechazar
            </button>
            {mostrarMotivo && (
              <button className="btn-rechazar" onClick={() => guardarCambios(9)} style={{ marginLeft: '10px' }}>
                Confirmar Rechazo
              </button>
            )}
          </div>
                                                    {/* ✅ Botones flotantes */}
        <div className="iconos-body">
          <div className="home-body-centrado">
            <BotonRedondo icono={<FaHome />} ariaLabel="Inicio" onClick={() => navigate('/admin/postulantes')} />
          </div>
        </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};


export default SeleccionIndividual;
