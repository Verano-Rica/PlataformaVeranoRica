// src/components/LogoCentral.jsx
import React from 'react';
import iconoBienvenida from '../assets/icon-bienvenida.png'; // Asegúrate de que el nombre y ruta sean correctos

const LogoCentral = () => {
  const containerStyle = {
    width: '100%',
    textAlign: 'center',
    margin: '30px 0'
  };

  const imageStyle = {
    maxWidth: '300px',
    height: 'auto'
  };

  return (
    <div style={containerStyle}>
      <img src={iconoBienvenida} alt="Logo Experiencia" style={imageStyle} />
    </div>
  );
};

export default LogoCentral;
