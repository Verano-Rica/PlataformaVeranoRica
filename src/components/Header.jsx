import React from 'react';
import { FaBars } from 'react-icons/fa';
import avatar from '../assets/avatar.png';
 //import '../styles/usuarioPanel.css';
  import '../styles/vistaGeneral.css';


const Header = ({ nombre, toggleMenu, handleLogout }) => {
  return (
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
  );
};

export default Header;
