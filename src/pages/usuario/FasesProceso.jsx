import React, { useEffect, useState } from 'react';
import LineaTiempo from '../../components/LineaTiempo';
import { FASES, FASES_TEXTO } from '../../utils/constantes';
import Fase1Documentos from '../../components/Fases/Fase1Documentos';
import Fase2Talla from '../../components/Fases/Fase2Talla';
import Fase3Disponibilidad from '../../components/Fases/Fase3Disponibilidad';
import Fase4Psicometrico from '../../components/Fases/Fase4Psicometrico';
import axios from 'axios';
import '../../styles/fasesProceso.css'; // Asegúrate de tener este archivo

const FasesProceso = () => {
  const idUsuario = localStorage.getItem('userId');
  const [estado, setEstado] = useState(0);
  const [datos, setDatos] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUser = await axios.get(`http://localhost:3001/api/usuarios/${idUsuario}`);
        setEstado(resUser.data.estado_proceso);

        const resFase = await axios.get(`http://localhost:3001/api/fase-final/${idUsuario}`);
        setDatos(resFase.data);
      } catch (error) {
        console.error('❌ Error al obtener datos del proceso:', error);
      }
    };

    if (idUsuario) {
      fetchData();
    }
  }, [idUsuario]);

  const actualizarDatos = (nuevo) => {
    setDatos((prev) => ({ ...prev, ...nuevo }));
  };

  if (!idUsuario) {
    return (
      <div className="contenedor-fases">
        <h2>Error</h2>
        <p>No se encontró el ID del usuario. Por favor inicia sesión nuevamente.</p>
      </div>
    );
  }

  return (
    <div className="contenedor-fases">
      <h2>Seguimiento de Fases</h2>
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
