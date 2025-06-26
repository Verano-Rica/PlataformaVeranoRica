import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FASES } from '../../utils/constantes';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../styles/tablaUsuarios.css';

const nombreFase = {
  [FASES.REGISTRADO]: 'Registrado',
  [FASES.FORMULARIO_ENVIADO]: 'Formulario enviado',
  [FASES.ENTREVISTA_AGENDADA]: 'Entrevista agendada',
  [FASES.EN_REVISION]: 'En revisión',
  [FASES.ACEPTADO]: 'Aceptado',
  [FASES.FASE1]: 'Fase 1',
  [FASES.FASE2]: 'Fase 2',
  [FASES.FASE3]: 'Fase 3',
  [FASES.FASE4]: 'Fase 4',
  [FASES.RECHAZADO]: 'Rechazado'
};

const colorFase = {
  [FASES.REGISTRADO]: '#ccc',
  [FASES.FORMULARIO_ENVIADO]: '#f0ad4e',
  [FASES.ENTREVISTA_AGENDADA]: '#5bc0de',
  [FASES.EN_REVISION]: '#0275d8',
  [FASES.ACEPTADO]: '#5cb85c',
  [FASES.FASE1]: '#d1ecf1',
  [FASES.FASE2]: '#b8daff',
  [FASES.FASE3]: '#bee5eb',
  [FASES.FASE4]: '#c3e6cb',
  [FASES.RECHAZADO]: '#d9534f'
};

const UsuariosRegistrados = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/admin/usuarios/todos')
      .then(res => setUsuarios(res.data))
      .catch(err => console.error('Error al cargar usuarios:', err));
  }, []);

  return (
    <div className="panel-container">
      <Sidebar />
      <div className="panel-contenido">
        <Header nombre="Panel Administrador: Usuarios Registrados" />

        <main className="main-contenido">
          <h2 className="titulo-usuarios">Lista de Usuarios Registrados</h2>
          <table className="tabla-usuarios">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Fase</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(user => (
                <tr key={user.id}>
                  <td>{user.nombre} {user.apellido_paterno} {user.apellido_materno}</td>
                  <td>{user.correo}</td>
                  <td style={{ backgroundColor: colorFase[user.estado_proceso], fontWeight: 'bold' }}>
                    {nombreFase[user.estado_proceso]}
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

export default UsuariosRegistrados;
