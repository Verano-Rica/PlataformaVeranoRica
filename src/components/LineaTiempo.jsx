import React from 'react';
import '../styles/lineaTiempo.css';
import { FASES } from '../utils/constantes';

const LineaTiempo = ({ estadoProceso }) => {
  const fases = [
    { descripcion: 'Documentos', estado: FASES.FASE1 },
    { descripcion: 'Talla', estado: FASES.FASE2 },
    { descripcion: 'Disponibilidad', estado: FASES.FASE3 },
    { descripcion: 'Psicométricos', estado: FASES.FASE4 }
  ];

  return (
    <div className="linea-tiempo-contenedor">
      {fases.map((fase, index) => {
        const completada = estadoProceso >= fase.estado;
        const siguienteCompletada = estadoProceso >= fases[index + 1]?.estado;
        return (
          <div className="fase" key={index}>
            <div className={`circulo ${completada ? 'completado' : ''}`}>{index + 1}</div>
            <div className="descripcion-fase">{fase.descripcion}</div>
            {index < fases.length - 1 && (
              <div className={`linea ${siguienteCompletada ? 'linea-activa' : ''}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LineaTiempo;
