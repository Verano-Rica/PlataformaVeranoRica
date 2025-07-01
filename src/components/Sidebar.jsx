import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import '../styles/vistaGeneral.css';

const Sidebar = ({ menuAbierto, toggleMenu }) => {
  return (
    <div className={`sidebar ${menuAbierto ? 'abierto' : ''}`}>
      <div className="menu-opciones">
        <Link to="/usuario" onClick={toggleMenu}>
          <div className="account-circle-icon-1">
            <FaHome className="icon-style" />
          </div>
          INICIO
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
