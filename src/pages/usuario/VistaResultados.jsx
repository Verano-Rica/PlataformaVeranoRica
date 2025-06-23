import React, { useEffect, useState } from 'react';
import '../styles/resultados.css';

const VistaResultados = () => {
  const [estado, setEstado] = useState('');
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    const correo = localStorage.getItem('correoUsuario');

    fetch(`http://localhost:3001/usuario/estado?correo=${correo}`)
      .then((res) => res.json())
      .then((data) => {
        setNombre(data.nombre);
        setEstado(data.estado);
      })
      .catch((err) => console.error('Error al obtener estado:', err));
  }, []);

  const renderMensaje = () => {
    if (estado === 'aceptado') {
      return (
        <>
          <h2>🎉 ¡Felicidades, {nombre}!</h2>
          <p>Has sido aceptado(a) al programa <strong>Verano RICA 2026</strong>.</p>
          <p>Te esperamos el <strong>8 de junio a las 9:00 a.m.</strong> en la Planta Pachuca.</p>
        </>
      );
    } else if (estado === 'rechazado') {
      return (
        <>
          <h2>😔 Gracias por tu participación, {nombre}</h2>
          <p>Lamentablemente no fuiste seleccionado(a) para esta edición.</p>
          <p>¡No te desanimes! Aplica nuevamente el próximo año.</p>
        </>
      );
    } else {
      return (
        <>
          <h2>⌛ Resultado en revisión</h2>
          <p>Tu solicitud aún está siendo evaluada. Te notificaremos pronto.</p>
        </>
      );
    }
  };

  return (
    <div className="vista-resultado">
      <div className="card-resultado">
        {renderMensaje()}
      </div>
    </div>
  );
};

export default VistaResultados;
