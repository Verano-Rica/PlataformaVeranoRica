import React from 'react';
import '../../styles/fasesProceso.css';

const Fase4Gracias = () => {
  return (
    <div className="fase-final-gracias">
      <h2 className="titulo-fase" style={{ textAlign: 'center', color: '#b51818' }}>
        ¡Gracias por completar tu proceso!
      </h2>
      <div className="mensaje-final">
        <p>
          Muy pronto recibirás por correo electrónico el enlace y la contraseña para realizar tus exámenes psicométricos.
        </p>
        <p>
          Por favor, mantente pendiente y revisa tu bandeja de entrada y/o spam.
        </p>
      </div>
    </div>
  );
};

export default Fase4Gracias;
