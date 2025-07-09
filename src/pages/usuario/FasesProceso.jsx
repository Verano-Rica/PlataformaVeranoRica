import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import LineaTiempo from '../../components/LineaTiempo';
import { FASES } from '../../utils/constantes';
import Fase1Documentos from '../../components/Fases/Fase1Documentos';
import Fase2Talla from '../../components/Fases/Fase2Talla';
import Fase3Disponibilidad from '../../components/Fases/Fase3Disponibilidad';
import Fase4Gracias from '../../components/Fases/Fase4Gracias';
import axios from 'axios';
import '../../styles/fasesProceso.css';

const FasesProceso = () => {
  const idUsuario = localStorage.getItem('userId');
  const [faseActual, setFaseActual] = useState(1);
  const [estadoProceso, setEstadoProceso] = useState(4);
  const [datos, setDatos] = useState({});

  const tituloPersonalizado = (
    <span className="titulo-header-unido">
      <span className="programa-normal">Programa </span>
      <span className="verano-negritas">VERANO RICA</span>
    </span>
  );

  useEffect(() => {
    const fetchEstadoYDatos = async () => {
      try {
        const resEstado = await axios.get(`http://localhost:3001/api/estado/${idUsuario}`);
        const estado = resEstado.data.estado_proceso;

        // Evita faseActual > 3
        const faseVisual = estado - 3;
        if (faseVisual >= 1 && faseVisual <= 4) {
          setFaseActual(faseVisual);
          setEstadoProceso(estado);
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
      return <Fase4Gracias />;
        default:
        return <p>Fase aún no disponible.</p>;
    }
  };

  const toggleMenu = () => {};
  const handleLogout = () => (window.location.href = '/');

  return (
    <div className="panel-usuario">
      <div className="contenido-principal">
        <Header nombre={tituloPersonalizado} toggleMenu={toggleMenu} handleLogout={handleLogout} />
        <Sidebar />
        <div className="contenedor-fases">
          <h2 className="titulo-fase">Seguimiento de Fases Finales</h2>
          <LineaTiempo estadoProceso={estadoProceso} />
          {renderFase()}
          <div className="botones-navegacion-fases">
            <button
              className="btn-fase"
              onClick={() => setFaseActual(f => f - 1)}
              disabled={faseActual === 1}
            >
              ⬅ Anterior
            </button>
            {faseActual < 4 && (
              <button
                className="btn-fase"
                onClick={() => setFaseActual(f => f + 1)}
              >
                Siguiente ➡
              </button>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default FasesProceso;
