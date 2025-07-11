import React from 'react';
import '../../styles/fasesProceso.css';
import { FaCheckCircle } from 'react-icons/fa';

const Fase4Gracias = () => {
  return (
    <div className="fase-final-gracias">
      <div className="icono-final">
        <FaCheckCircle style={{ fontSize: '60px', color: '#28a745' }} />
      </div>
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
