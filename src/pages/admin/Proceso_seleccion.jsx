import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/entrevista.css';

const ProcesoSeleccion = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/seleccion')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsuarios(data);
        } else {
          console.error('Respuesta no válida:', data);
        }
      })
      .catch((error) => console.error('Error al obtener usuarios:', error));

    fetch('http://localhost:3001/api/areas')
      .then((res) => res.json())
      .then((data) => setAreas(data))
      .catch((error) => console.error('Error al obtener áreas:', error));
  }, []);

  const handleInputChange = (e, index, campo) => {
    const nuevosUsuarios = [...usuarios];
    nuevosUsuarios[index][campo] = e.target.value;
    setUsuarios(nuevosUsuarios);
  };

const guardarAsignacion = (usuario) => {
  fetch(`http://localhost:3001/api/seleccion/asignar/${usuario.id_usuario}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      area_final_id: usuario.area_final_id,
      subarea: usuario.subarea,
      proyecto_asignado: usuario.proyecto_asignado,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.mensaje) {
        alert('✔ ' + data.mensaje);
        console.log(data);
      } else {
        alert('No se pudo guardar: ' + (data.error || 'Error desconocido'));
      }
    })
    .catch((error) => {
      console.error('Error al guardar:', error);
      alert('Ocurrió un error al guardar');
    });
};


  return (
    <div className="main-container">
      <Sidebar />
      <div className="content">
        <Header />
        <div className="container mt-4 p-4 rounded shadow bg-white">
          <h2 className="mb-4 text-center text-danger fw-bold">Proceso de Selección Final</h2>
          <div className="table-responsive">
            <table className="table table-bordered table-striped align-middle text-center">
              <thead className="table-dark">
                <tr>
                  <th>Nombre</th>
                  <th>Universidad</th>
                  <th>Área Inicial</th>
                  <th>Proyecto Elegido</th>
                  <th>Área Final</th>
                  <th>Subárea</th>
                  <th>Proyecto Asignado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario, index) => (
                  <tr key={usuario.id_usuario}>
                    <td>{`${usuario.nombre} ${usuario.apellido_paterno} ${usuario.apellido_materno}`}</td>
                    <td>{usuario.universidad}</td>
                    <td>{usuario.area}</td>
                    <td>{usuario.proyecto1}</td>
                    <td>
                      <select
                        className="form-select"
                        value={usuario.area_final_id || ''}
                        onChange={(e) => handleInputChange(e, index, 'area_final_id')}
                      >
                        <option value="">Seleccionar área</option>
                        {areas.map((area) => (
                          <option key={area.id} value={area.id}>
                            {area.nombre}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Subárea"
                        value={usuario.subarea || ''}
                        onChange={(e) => handleInputChange(e, index, 'subarea')}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Proyecto asignado"
                        value={usuario.proyecto_asignado || ''}
                        onChange={(e) => handleInputChange(e, index, 'proyecto_asignado')}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => guardarAsignacion(usuario)}
                      >
                        Guardar
                      </button>
                    </td>
                  </tr>
                ))}
                {usuarios.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center text-muted">
                      No hay usuarios aceptados aún.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ProcesoSeleccion;
