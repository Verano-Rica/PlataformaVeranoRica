import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../styles/agendados.css';

const UsuariosAgendados = () => {
  const [usuarios, setUsuarios] = useState([]);

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

  return (
    <div className="panel-container">
      <Sidebar />
      <div className="panel-contenido">
        <Header nombre="Panel Administrador: Usuarios Agendados" />

        <main className="main-contenido">
          <h2 className="titulo-usuarios">Usuarios con Entrevista Agendada</h2>
          <table className="tabla-usuarios">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Fecha</th>
                <th>Bloque</th>
                <th>CV</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(user => (
                <tr key={user.id}>
                  <td>{user.nombre} {user.apellido_paterno} {user.apellido_materno}</td>
                  <td>{user.correo}</td>
                  <td>{user.fecha_entrevista}</td>
                  <td>{user.nombre_bloque}</td>
                  <td>
                    {user.cv_nombre ? (
                      <a href={`http://localhost:3001/uploads/${user.cv_nombre}`} target="_blank" rel="noopener noreferrer">
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
            </tbody>
          </table>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default UsuariosAgendados;
