import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/usuarioPanel.css';

import logoExperiencia from '../../assets/logo-experiencia.png';
import iconoInfo from '../../assets/icono-info.png';
import iconoProyectos from '../../assets/icono-proyectos.png';
import iconoEntrevista from '../../assets/icono-entrevista.png';
import iconoResultados from '../../assets/icono-resultados.png';

const UsuarioPanel = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const handleLogout = () => (window.location.href = '/');

  return (
    <div className={`panel-container ${menuAbierto ? 'menu-activo' : ''}`}>
      <Sidebar />
      <div className="panel-contenido">
        <Header nombre="Bienvenido(a): Larisa Moreno Zamora" toggleMenu={toggleMenu} handleLogout={handleLogout} />

        <main className="main-contenido">
          <img src={logoExperiencia} alt="Logo Experiencia" className="logo-central" />

          <div className="botones-principales">
            <div className="boton-seccion">
              <div className="circle-1">1</div>
              <p className="informaci-n-">INFORMACIÓN:</p>
              <div className="rectangle-6" onClick={() => navigate('/usuario/formulario')}>
                <img src={iconoInfo} alt="Información" className="assignment-icon-1" />
              </div>
            </div>

            <div className="boton-seccion">
              <div className="circle-4">2</div>
              <p className="proyectos-">PROYECTOS:</p>
              <div className="rectangle-7" onClick={() => navigate('/usuario/proyectos')}>
                <img src={iconoProyectos} alt="Proyectos" className="assignment-icon-1" />
              </div>
            </div>

            <div className="boton-seccion">
              <div className="circle-5">3</div>
              <p className="agendar-entrevista-">AGENDAR ENTREVISTA:</p>
              <div className="rectangle-8" onClick={() => navigate('/usuario/entrevista')}>
                <img src={iconoEntrevista} alt="Entrevista" className="assignment-icon-1" />
              </div>
            </div>

            <div className="boton-seccion">
              <div className="circle-6">4</div>
              <p className="resultados-">RESULTADOS:</p>
              <div className="rectangle-9" onClick={() => navigate('/usuario/resultados')}>
                <img src={iconoResultados} alt="Resultados" className="assignment-icon-1" />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default UsuarioPanel;
