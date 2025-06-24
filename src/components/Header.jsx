import React from 'react';
import { FaBars } from 'react-icons/fa';
import avatar from '../assets/avatar.png';
import '../styles/vistaGeneral.css';

const Header = ({ nombre = 'Usuario', toggleMenu, handleLogout }) => {
  return (
    <header className="header">
      <div className="usuario-info">
        <button className="hamburguesa-header" onClick={toggleMenu}>
          <FaBars />
        </button>
        <div className="avatar-contenedor">
          <img src={avatar} alt="Avatar" className="avatar-usuario" />
        </div>
        <span className="nombre-usuario">{nombre}</span>
      </div>
      <button className="cerrar-sesion" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </header>
  );
};

export default Header;
