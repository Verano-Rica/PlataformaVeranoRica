import React from 'react';
import './lineaTiempo.css';

const fases = [
  { id: 1, nombre: 'Fase 1', estado: 'completado' },
  { id: 2, nombre: 'Fase 2', estado: 'actual' },
  { id: 3, nombre: 'Fase 3', estado: 'pendiente' },
  { id: 4, nombre: 'Fase 4', estado: 'pendiente' },
];

const LineaTiempo = () => {
  return (
    <div className="linea-tiempo">
      {fases.map((fase, i) => (
        <div className="fase" key={fase.id}>
          <div className={`circulo ${fase.estado}`}></div>
          <span className="nombre-fase">{fase.nombre}</span>
          {i < fases.length - 1 && <div className="linea" />}
        </div>
      ))}
    </div>
  );
};

export default LineaTiempo;
