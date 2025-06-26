import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/proceso_seleccion.css';

const Proceso_seleccion = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/aceptar_usuarios/usuarios-completos')
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error('Error al obtener usuarios:', err));
  }, []);

  const manejarDecision = (id_usuario, decision) => {
    fetch('http://localhost:3001/api/aceptar_usuarios/actualizar-estado', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_usuario, decision })
    })
    .then(res => res.json())
    .then(data => {
      alert(data.mensaje);
      setUsuarios(prev => prev.filter(u => u.id_usuario !== id_usuario));
    })
    .catch(err => console.error('Error al actualizar estado:', err));
  };

  return (
    <div className="panel-container">
      <Sidebar />
      <div className="panel-contenido">
        <Header nombre="Panel Administrador" />
        <main className="main-contenido">
          <h2 className="admin-titulo">PROCESO DE SELECCION</h2>
          <table className="admin-tabla">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Universidad</th>
                <th>Carrera</th>
                <th>Área</th>
                <th>Proyecto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(user => (
                <tr key={user.id_usuario}>
                  <td>{user.nombre} {user.apellido_paterno}</td>
                  <td>{user.universidad}</td>
                  <td>{user.carrera}</td>
                  <td>{user.area}</td>
                  <td>{user.proyecto1}</td>
                  <td>
                    <button className="btn-aceptar" onClick={() => manejarDecision(user.id_usuario, 'aceptar')}>Aceptar</button>
                    <button className="btn-rechazar" onClick={() => manejarDecision(user.id_usuario, 'rechazar')}>Rechazar</button>
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

export default Proceso_seleccion;
