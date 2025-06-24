// src/components/BotonesNavegacion.jsx
import React from 'react';
import { FaHome, FaArrowCircleRight } from 'react-icons/fa';
import '../../styles/formulario.css'; // o el CSS donde están las clases .iconos-body y .icono-body

const BotonesNavegacion = ({ onHomeClick, onContinuarClick }) => {
  return (
    <div className="iconos-body">
      <div className="home-body-centrado" onClick={onHomeClick}>
        <FaHome className="icono-body" />
      </div>
      <div className="flecha-body-derecha" onClick={onContinuarClick}>
        <FaArrowCircleRight className="icono-body" />
      </div>
    </div>
  );
};

export default BotonesNavegacion;
