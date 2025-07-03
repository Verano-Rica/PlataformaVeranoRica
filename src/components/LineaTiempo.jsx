
import React from 'react';
import '../styles/lineaTiempo.css';
import { FASES, FASES_TEXTO } from '../utils/constantes';

const LineaTiempo = ({ estadoProceso }) => {
  const fases = [
    { nombre: 'Fase 1', descripcion: 'Documentos', estado: FASES.FASE1 },
    { nombre: 'Fase 2', descripcion: 'Talla', estado: FASES.FASE2 },
    { nombre: 'Fase 3', descripcion: 'Disponibilidad', estado: FASES.FASE3 },
    { nombre: 'Fase 4', descripcion: 'Psicométricos', estado: FASES.FASE4 }
  ];

  return (
    <div className="linea-tiempo-contenedor">
      {fases.map((fase, index) => {
        const completada = estadoProceso >= fase.estado;
        return (
          <div className="fase" key={index}>
            <div className={`circulo ${completada ? 'completado' : ''}`}>{index + 1}</div>
            <div className="nombre-fase">{fase.nombre}</div>
            <div className="descripcion-fase">{fase.descripcion}</div>
            {index < fases.length - 1 && (
              <div className={`linea ${estadoProceso >= fases[index + 1].estado ? 'linea-activa' : ''}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};
export default LineaTiempo;
