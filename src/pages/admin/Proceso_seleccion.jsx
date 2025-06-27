import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/proceso_seleccion.css';

const ProcesoSeleccion = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/seleccion/usuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error('Error al obtener usuarios:', err));

    fetch('http://localhost:3001/api/areas')
      .then(res => res.json())
      .then(data => setAreas(data))
      .catch(err => console.error('Error al obtener áreas:', err));
  }, []);

  const actualizarCampo = (id_usuario, campo, valor) => {
    setUsuarios(prev =>
      prev.map(usuario =>
        usuario.id_usuario === id_usuario
          ? { ...usuario, [campo]: valor }
          : usuario
      )
    );
  };

  const guardarAsignacion = (usuario) => {
    fetch(`http://localhost:3001/api/seleccion/asignar/${usuario.id_usuario}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        area_final_id: usuario.area_final_id,
        subarea_especifica: usuario.subarea_especifica,
        proyecto_asignado_final: usuario.proyecto_asignado_final,
      }),
    })
      .then(res => res.json())
      .then(data => {
        alert('✔ Asignación guardada correctamente');
        console.log(data);
      })
      .catch(error => {
        console.error('Error al guardar:', error);
        alert('Ocurrió un error al guardar');
      });
  };

  return (
    <div className="panel-container">
      <Sidebar />
      <div className="panel-contenido">
        <Header nombre="Proceso de Selección Final" />

        <main className="main-contenido">
          <h2 className="admin-titulo">Usuarios Seleccionados</h2>
          <div className="tabla-responsive">
            <table className="tabla-proceso">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Universidad</th>
                  <th>Carrera</th>
                  <th>Proyecto 1</th>
                  <th>Área Final</th>
                  <th>Subárea</th>
                  <th>Proyecto Final</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(user => (
                  <tr key={user.id_usuario}>
                    <td>{user.nombre} {user.apellido_paterno}</td>
                    <td>{user.universidad}</td>
                    <td>{user.carrera}</td>
                    <td>{user.proyecto1}</td>
                    <td>
                      <select
                        className="input-proceso"
                        value={user.area_final_id || ''}
                        onChange={(e) => actualizarCampo(user.id_usuario, 'area_final_id', e.target.value)}
                      >
                        <option value=''>Seleccionar área</option>
                        {areas.map(area => (
                          <option key={area.id} value={area.id}>{area.nombre}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        className="input-proceso"
                        type="text"
                        placeholder="Subárea"
                        value={user.subarea_especifica || ''}
                        onChange={(e) => actualizarCampo(user.id_usuario, 'subarea_especifica', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="input-proceso"
                        type="text"
                        placeholder="Proyecto"
                        value={user.proyecto_asignado_final || ''}
                        onChange={(e) => actualizarCampo(user.id_usuario, 'proyecto_asignado_final', e.target.value)}
                      />
                    </td>
                    <td>
                      <button className="btn-guardar-redondo" onClick={() => guardarAsignacion(user)}>
                        Guardar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default ProcesoSeleccion;
