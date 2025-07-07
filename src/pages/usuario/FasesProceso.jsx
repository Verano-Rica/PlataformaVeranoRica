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
  const [faseActual, setFaseActual] = useState(1); // visual
  const [estadoProceso, setEstadoProceso] = useState(4); // desde BD
  const [datos, setDatos] = useState({});

  useEffect(() => {
    const fetchEstadoYDatos = async () => {
      try {
        const resEstado = await axios.get(`http://localhost:3001/api/estado/${idUsuario}`);
        const estado = resEstado.data.estado_proceso;

        if (estado >= 4 && estado <= 7) {
          setFaseActual(estado - 3); // Fase visual
          setEstadoProceso(estado); // Para LineaTiempo
        }

        const resDatos = await axios.get(`http://localhost:3001/api/fasefinal/${idUsuario}`);
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

  const renderFase = () => {
    switch (faseActual) {
      case 1:
        return <Fase1Documentos datos={datos} actualizar={actualizarDatos} idUsuario={idUsuario} />;
      case 2:
        return <Fase2Talla datos={datos} actualizar={actualizarDatos} idUsuario={idUsuario} />;
      case 3:
        return <Fase3Disponibilidad datos={datos} actualizar={actualizarDatos} idUsuario={idUsuario} />;
      case 4:
        return <Fase4Psicometrico datos={datos} actualizar={actualizarDatos} idUsuario={idUsuario} />;
      default:
        return <p>Fase desconocida</p>;
    }
  };

  return (
    <div className="contenedor-fases">
      <h2>Seguimiento de Fases Finales</h2>
      <LineaTiempo estadoProceso={estadoProceso} />
      <p className="texto-fase">
        Estado actual: <strong>{FASES_TEXTO[estadoProceso]}</strong>
      </p>

      {renderFase()}

      <div className="botones-navegacion-fases">
        <button
          className="btn-fase"
          onClick={() => setFaseActual(f => f - 1)}
          disabled={faseActual === 1}
        >
          ⬅ Anterior
        </button>

        <button
          className="btn-fase"
          onClick={() => setFaseActual(f => f + 1)}
          disabled={faseActual === 4}
        >
          Siguiente ➡
        </button>
      </div>
    </div>
  );
};

export default FasesProceso;
