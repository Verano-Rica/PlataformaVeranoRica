import React from 'react';
import '../../styles/proyectos.css';

const proyectos = [
  "Documentación y actualización de procesos del área de capacitación",
  "Documentación y actualización de procesos del área de capacitación",
  "Documentación y actualización de procesos del área de capacitación",
  "Documentación y actualización de procesos del área de capacitación"
];

const VistaProyectos = () => {
  return (
    <div className="rombo-grid">
      {proyectos.map((texto, index) => (
        <div
          className={`rombo-row ${index % 2 === 0 ? 'derecha' : 'izquierda'}`}
          key={index}
        >
          {index % 2 !== 0 && (
            <div className="texto-lateral left">
              <p>"{texto}"</p>
            </div>
          )}

          <div className="rombo-superpuesto">
            <span>{index + 1}</span>
          </div>

          {index % 2 === 0 && (
            <div className="texto-lateral right">
              <p>"{texto}"</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VistaProyectos;
