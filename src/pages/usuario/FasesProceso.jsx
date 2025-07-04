import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LineaTiempo from '../../components/LineaTiempo';
import { FASES, FASES_TEXTO } from '../../utils/constantes';
import Fase1Documentos from '../../components/Fases/Fase1Documentos';
import Fase2Talla from '../../components/Fases/Fase2Talla';
import Fase3Disponibilidad from '../../components/Fases/Fase3Disponibilidad';
import Fase4Psicometrico from '../../components/Fases/Fase4Psicometrico';

const FasesProceso = () => {
  const idUsuario = localStorage.getItem('userId');
  const [estado, setEstado] = useState(0);
  const [datos, setDatos] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUser = await axios.get(`http://localhost:3001/api/usuarios/${idUsuario}`);
        let estadoBD = resUser.data.estado_proceso;

        // 🔄 Si está aceptado, se inicia Fase1 (internamente usamos estado 5)
        if (estadoBD === 4) {
          estadoBD = 5;
          await axios.put(`http://localhost:3001/api/usuarios/actualizar-estado`, {
            id: idUsuario,
            nuevoEstado: 5,
          });
        }

        setEstado(estadoBD);

        const resFase = await axios.get(`http://localhost:3001/api/fase-final/${idUsuario}`);
        setDatos(resFase.data || {});
      } catch (error) {
        console.error('Error al obtener estado de fases:', error);
      }
    };

    fetchData();
  }, [idUsuario]);

  const actualizarDatos = (nuevo) => {
    setDatos(prev => ({ ...prev, ...nuevo }));
  };

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
