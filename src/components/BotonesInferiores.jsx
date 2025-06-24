// src/components/BotonesInferiores.jsx
import React from 'react';
import { FaHome, FaArrowCircleRight } from 'react-icons/fa';
import '../styles/usuarioPanel.css';

const BotonesInferiores = () => {
  return (
    <>
      <div className="boton-casa">
        <FaHome className="icono-boton" />
      </div>
      <div className="boton-flecha">
        <FaArrowCircleRight className="icono-boton" />
      </div>
    </>
  );
};

export default BotonesInferiores;