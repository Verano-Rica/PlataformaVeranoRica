import React, { useEffect, useState } from 'react';
import LineaTiempo from '../../components/LineaTiempo';
import { FASES, FASES_TEXTO } from '../../utils/constantes';
import Fase1Documentos from '../../components/Fases/Fase1Documentos';
import Fase2Talla from '../../components/Fases/Fase2Talla';
import Fase3Disponibilidad from '../../components/Fases/Fase3Disponibilidad';
import Fase4Psicometrico from '../../components/Fases/Fase4Psicometrico';
import axios from 'axios';
import '../../styles/fasesProceso.css';

const FasesProceso = () => {
  const idUsuario = localStorage.getItem('userId');
  const [estado, setEstado] = useState(5); // Por defecto empieza en Fase1
  const [datos, setDatos] = useState({});
useEffect(() => {
  const fetchEstadoYDatos = async () => {
    try {
      const resEstado = await axios.get(`http://localhost:3001/api/estado/${idUsuario}`);
      const estadoActual = resEstado.data.estado_proceso;

      // Si apenas fue aceptado (estado 4), lo mostramos en la FASE 1
      if (estadoActual === 4) {
        setEstado(FASES.FASE1); // Mostramos componente de Documentos
      } else {
        setEstado(estadoActual); // Muestra FASE2, 3, etc. si ya avanzó
      }

      const resDatos = await axios.get(`http://localhost:3001/api/fase-final/${idUsuario}`);
      setDatos(resDatos.data);
    } catch (error) {
      console.error('Error al obtener datos del proceso:', error);
    }
  };

  if (idUsuario) fetchEstadoYDatos();
}, [idUsuario]);


  const actualizarDatos = (nuevo) => {
    setDatos(prev => ({ ...prev, ...nuevo }));
  };

  return (
    <div className="contenedor-fases">
      <h2>Seguimiento de Fases Finales</h2>
      <LineaTiempo estadoProceso={estado} />
      <p className="texto-fase">
        Estado actual: <strong>{FASES_TEXTO[estado]}</strong>
      </p>

      {estado === FASES.FASE1 && (
        <Fase1Documentos datos={datos} actualizar={actualizarDatos} idUsuario={idUsuario} />
      )}
      {estado === FASES.FASE2 && (
        <Fase2Talla datos={datos} actualizar={actualizarDatos} idUsuario={idUsuario} />
      )}
      {estado === FASES.FASE3 && (
        <Fase3Disponibilidad datos={datos} actualizar={actualizarDatos} idUsuario={idUsuario} />
      )}
      {estado === FASES.FASE4 && (
        <Fase4Psicometrico datos={datos} actualizar={actualizarDatos} idUsuario={idUsuario} />
      )}
    </div>
  );
};

export default FasesProceso;
