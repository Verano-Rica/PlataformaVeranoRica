import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/proceso_seleccion.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const UsuariosSeleccionados = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    cargarUsuarios();
    axios.get('http://localhost:3001/api/areas')
      .then(res => setAreas(res.data))
      .catch(err => console.error('Error al cargar áreas:', err));
  }, []);

  const cargarUsuarios = () => {
    axios.get('http://localhost:3001/api/admin/seleccionados')
      .then(res => setUsuarios(res.data))
      .catch(err => console.error('Error al cargar usuarios:', err));
  };

  const handleChange = (id, campo, valor) => {
    setUsuarios(prev =>
      prev.map(u => (u.id_usuario === id ? { ...u, [campo]: valor } : u))
    );
  };

  const guardarCambios = (usuario, estadoFinal) => {
    axios.put(`http://localhost:3001/api/admin/seleccionados/actualizar/${usuario.id_usuario}`, {
      area_final_id: usuario.area_final_id,
      subarea_especifica: usuario.subarea_especifica,
      proyecto_asignado_final: usuario.proyecto_asignado_final,
      estado_seleccion: estadoFinal
    })
      .then(() => {
        alert('✔ Usuario actualizado');
        cargarUsuarios(); // Refrescar tabla
      })
      .catch(() => alert('Error al guardar'));
  };

  return (
    <div className="admin-panel">
      <Sidebar />
      <div className="contenido-principal">
        <Header titulo="Bienvenido administrador(a)" />
        <div className="tabla-contenedor">
          <h2 className="titulo-seccion">Usuarios Seleccionados</h2>
          <div className="tabla-responsive">
            <table className="tabla-proceso">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Teléfono</th>
                  <th>Área (formulario)</th>
                  <th>Área Final</th>
                  <th>Subárea</th>
                  <th>Proyecto</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u, i) => (
                  <tr key={i}>
                    <td>{u.id_usuario}</td>
                    <td>{u.nombre} {u.apellido_paterno} {u.apellido_materno}</td>
                    <td>{u.correo}</td>
                    <td>{u.telefono}</td>
                    <td>{u.nombre_area_formulario || '-'}</td>
                    <td>
                      <select
                        className="input-proceso"
                        value={u.area_final_id || ''}
                        onChange={(e) => handleChange(u.id_usuario, 'area_final_id', e.target.value)}
                      >
                        <option value="">Selecciona</option>
                        {areas.map(area => (
                          <option key={area.id} value={area.id}>{area.nombre}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        className="input-proceso"
                        type="text"
                        value={u.subarea_especifica || ''}
                        onChange={(e) => handleChange(u.id_usuario, 'subarea_especifica', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="input-proceso"
                        type="text"
                        value={u.proyecto_asignado_final || ''}
                        onChange={(e) => handleChange(u.id_usuario, 'proyecto_asignado_final', e.target.value)}
                      />
                    </td>
                    <td>
                      <button className="btn-aceptar" onClick={() => guardarCambios(u, 4)}><FaCheckCircle /> Aceptarrr</button>
                      <button className="btn-rechazar" onClick={() => guardarCambios(u, 9)}><FaTimesCircle /> Rechazar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default UsuariosSeleccionados;
