import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaUserCircle, FaCog, FaQuestionCircle, FaBars } from 'react-icons/fa';
import '../../styles/usuarioPanel.css';
import avatar from '../../assets/avatar.png';
import logoExperiencia from '../../assets/logo-experiencia.png';
import iconoInfo from '../../assets/icono-info.png';
import iconoProyectos from '../../assets/icono-proyectos.png';
import iconoEntrevista from '../../assets/icono-entrevista.png';
import iconoResultados from '../../assets/icono-resultados.png';

function AdminPanel() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [totales, setTotales] = useState({ registrados: 0, seleccionados: 0 });
  const navigate = useNavigate();
  const nombre = 'Bienvenido administrador(a)';

  useEffect(() => {
    axios.get('http://localhost:3001/api/postulantes/totales')
      .then(res => setTotales(res.data))
      .catch(err => console.error('Error al obtener totales', err));
  }, []);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div className={`panel-container ${menuAbierto ? 'menu-activo' : ''}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="menu-opciones">
          <Link to="/usuario/perfil">
            <div className="account-circle-icon-1"><FaUserCircle className="icon-style" /></div>Perfil
          </Link>
          <Link to="/usuario/configuracion">
            <div className="account-circle-icon-1"><FaCog className="icon-style" /></div>Configuración
          </Link>
          <Link to="/usuario/ayuda">
            <div className="help-outline-icon-1"><FaQuestionCircle className="icon-style" /></div>Ayuda
          </Link>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="panel-contenido">
        <header className="header">
          <div className="usuario-info">
            <button className="hamburguesa-header" onClick={toggleMenu}><FaBars /></button>
            <span className="nombre-usuario">{nombre}</span>
          </div>
          <button className="cerrar-sesion" onClick={handleLogout}>Cerrar sesión</button>
        </header>

        <main className="main-contenido">
          <img src={logoExperiencia} alt="Logo Experiencia" className="logo-central" />

          <div className="botones-principales">
            {/* Fases */}
            <div className="boton-seccion">
              <div className="circle-1">1</div>
              <p className="informaci-n-">FASES DE POSTULANTES:</p>
              <div className="rectangle-6" onClick={() => navigate('/admin/usuarios-registrados')}>
                <img src={iconoInfo} alt="Información" className="assignment-icon-1" />
              </div>
            </div>

            {/* Agendados */}
            <div className="boton-seccion">
              <div className="circle-4">2</div>
              <p className="agendar-entrevista-">AGENDADOS:</p>
              <div className="rectangle-7" onClick={() => navigate('/admin/usuarios-agendados')}>
                <img src={iconoEntrevista} alt="Entrevista" className="assignment-icon-1" />
              </div>
            </div>

            {/* Registrados */}
            <div className="boton-seccion">
              <div className="circle-5">{totales.registrados}</div>
              <p className="proyectos-">POSTULANTES REGISTRADOS:</p>
              <div className="rectangle-8" onClick={() => navigate('/admin/postulantes')}>
                <img src={iconoProyectos} alt="Proyectos" className="assignment-icon-1" />
              </div>
            </div>

            {/* Selección */}
            <div className="boton-seccion">
              <div className="circle-6">{totales.seleccionados}</div>
              <p className="resultados-">PROCESO SELECCIÓN:</p>
              <div className="rectangle-9" onClick={() => navigate('/admin/usuarios-seleccionados')}>
                <img src={iconoResultados} alt="Resultados" className="assignment-icon-1" />
              </div>
            </div>
          </div>
        </main>

        <footer className="footer">
          <p>&copy; 2026 Experiencia Verano RICA · Todos los derechos reservados</p>
        </footer>
      </div>
    </div>
  );
}

export default AdminPanel;
