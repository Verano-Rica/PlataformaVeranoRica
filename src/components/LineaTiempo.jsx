import React from 'react';
import '../styles/lineaTiempo.css';
import { FASES } from '../utils/constantes';

const LineaTiempo = ({ estadoProceso }) => {
  const fases = [
    { estado: FASES.FASE1 },
    { estado: FASES.FASE2 },
    { estado: FASES.FASE3 }
  ];

  return (
    <div className="linea-tiempo-proceso">
      {fases.map((fase, index) => {
        const completado = estadoProceso >= fase.estado;
        const mostrarLinea = index < fases.length - 1;
        const siguienteCompletado = estadoProceso >= fases[index + 1]?.estado;

        return (
          <div className="fase-con-linea" key={index}>
            <div className="contenedor-circulo-linea">
              <div className={`circulo ${completado ? 'completado' : ''}`}>
                {index + 1}
              </div>

              {mostrarLinea && (
                <div className={`linea-horizontal ${siguienteCompletado ? 'completado' : ''}`}></div>
              )}
            </div>
            <div className="nombre-fase">PASO {index + 1}</div>
          </div>
        );
      })}
    </div>
  );
};

export default LineaTiempo;
