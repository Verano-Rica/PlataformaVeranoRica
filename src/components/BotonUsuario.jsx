// src/components/BotonUsuario.jsx
import React from 'react';
import '../styles/botonUsuario.css';

const BotonUsuario = ({ numero, titulo, imagenSrc, alt, onClick }) => {
  return (
    <div className="boton-seccion">
      <div className="circulo-numero">{numero}</div>
      <p className="titulo-seccion">{titulo}:</p>
      <div className="rectangulo-icono" onClick={onClick}>
        <img src={imagenSrc} alt={alt} className="icono-imagen" />
      </div>
    </div>
  );
};

export default BotonUsuario;
