import React from 'react';
import '../styles/botonRedondo.css';

const BotonRedondo = ({ icono, onClick, colorFondo = '#b51818', colorIcono = 'white', ariaLabel }) => {
  return (
    <button
      className="boton-redondo"
      onClick={onClick}
      style={{ backgroundColor: colorFondo }}
      aria-label={ariaLabel}
    >
      <div className="icono-redondo" style={{ color: colorIcono }}>
        {icono}
      </div>
    </button>
  );
};

export default BotonRedondo;
