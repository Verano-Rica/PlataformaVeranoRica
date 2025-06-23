import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserCircle, FaCog, FaQuestionCircle, FaBars } from 'react-icons/fa';
import '../../styles/usuarioPanel.css';
import avatar from '../../assets/avatar.png';
import logoExperiencia from '../../assets/logo-experiencia.png';
import iconoInfo from '../../assets/icono-info.png';
import iconoProyectos from '../../assets/icono-proyectos.png';
import iconoEntrevista from '../../assets/icono-entrevista.png';
import iconoResultados from '../../assets/icono-resultados.png';

const UsuarioPanel = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const nombre = 'Bienvenido(a): Larisa Moreno Zamora';
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div className={`panel-container ${menuAbierto ? 'menu-activo' : ''}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="menu-opciones">
          <Link to="/usuario/perfil">
            <div className="account-circle-icon-1">
              <FaUserCircle className="icon-style" />
            </div>
            Perfil
          </Link>

          <Link to="/usuario/configuracion">
            <div className="account-circle-icon-1">
              <FaCog className="icon-style" />
            </div>
            Configuración
          </Link>

          <Link to="/usuario/ayuda">
            <div className="help-outline-icon-1">
              <FaQuestionCircle className="icon-style" />
            </div>
            Ayuda
          </Link>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="panel-contenido">
        <header className="header">
          <div className="usuario-info">
            <button className="hamburguesa-header" onClick={toggleMenu}>
              <FaBars />
            </button>
            <img src={avatar} alt="Avatar" className="avatar" />
            <span className="nombre-usuario">{nombre}</span>
          </div>
          <button className="cerrar-sesion" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </header>

        <main className="main-contenido">
          <img src={logoExperiencia} alt="Logo Experiencia" className="logo-central" />

          <div className="botones-principales">
            {/* Información */}
            <div className="boton-seccion">
              <div className="circle-1">1</div>
              <p className="informaci-n-">INFORMACIÓN:</p>
              <div
                className="rectangle-6"
                onClick={() => navigate('/usuario/formulario')}
              >
                <img src={iconoInfo} alt="Información" className="assignment-icon-1" />
              </div>
            </div>

            {/* Proyectos */}
            <div className="boton-seccion">
              <div className="circle-4">2</div>
              <p className="proyectos-">PROYECTOS:</p>
              <div
                className="rectangle-7"
                onClick={() => navigate('/usuario/proyectos')}
              >
                <img src={iconoProyectos} alt="Proyectos" className="assignment-icon-1" />
              </div>
            </div>

            {/* Agendar Entrevista */}
            <div className="boton-seccion">
              <div className="circle-5">3</div>
              <p className="agendar-entrevista-">AGENDAR ENTREVISTA:</p>
              <div
                className="rectangle-8"
                onClick={() => navigate('/usuario/entrevista')}
              >
                <img src={iconoEntrevista} alt="Entrevista" className="assignment-icon-1" />
              </div>
            </div>

            {/* Resultados */}
            <div className="boton-seccion">
              <div className="circle-6">4</div>
              <p className="resultados-">RESULTADOS:</p>
              <div
                className="rectangle-9"
                onClick={() => navigate('/usuario/resultados')}
              >
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
};

export default UsuarioPanel;
