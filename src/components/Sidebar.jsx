import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaCog, FaQuestionCircle } from 'react-icons/fa';
 //import '../styles/usuarioPanel.css';
  import '../styles/vistaGeneral.css';



const Sidebar = () => {
  return (
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
  );
};

export default Sidebar;
