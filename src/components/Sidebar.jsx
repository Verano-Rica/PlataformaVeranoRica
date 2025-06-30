import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import '../styles/vistaGeneral.css'; // Debe tener el CSS con sidebar

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="menu-opciones">
        <Link to="/usuario">
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
