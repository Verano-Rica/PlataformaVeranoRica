import React, { useState } from 'react';
import '../../styles/fasesProceso.css';
import { FaSave, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Fase1Documentos = ({ idUsuario, actualizar, actualizarEstado }) => {
  const [ine, setIne] = useState(null);
  const [curp, setCurp] = useState(null);
  const [acta, setActa] = useState(null);
  const [comprobante, setComprobante] = useState(null);

  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');
  const [mostrarToast, setMostrarToast] = useState(false);

  const handleSubmit = async () => {
    if (!ine || !curp || !acta || !comprobante) {
      setTipoMensaje('error');
      setMensaje('Por favor sube todos los documentos requeridos.');
      setMostrarToast(true);
      return;
    }

    const formData = new FormData();
    formData.append('id_usuario', idUsuario);
    formData.append('ine', ine);
    formData.append('curp', curp);
    formData.append('acta', acta);
    formData.append('comprobante_domicilio', comprobante);

    try {
      const res = await fetch(`http://localhost:3001/api/fasefinal/guardar`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setTipoMensaje('exito');
        setMensaje('Documentos guardados correctamente.');
        setMostrarToast(true);
        actualizar();
        actualizarEstado(); // ✅ esto actualiza la línea del tiempo
      } else {
        setTipoMensaje('error');
        setMensaje('Error al guardar los documentos. Intenta nuevamente.');
        setMostrarToast(true);
      }
    } catch (error) {
      setTipoMensaje('error');
      setMensaje('Error de conexión con el servidor.');
      setMostrarToast(true);
    }
  };

  const cerrarModal = () => setMostrarToast(false);

  const validarPDF = (file, setter) => {
    if (file && file.type !== 'application/pdf') {
      setTipoMensaje('error');
      setMensaje('Solo se permiten archivos PDF');
      setMostrarToast(true);
      setter(null);
    } else {
      setter(file);
    }
  };

  return (
    <div className="contenedor-documentos">
      <h3 className="titulo-subir">Subir documentos</h3>

      {[
        { num: 1, label: 'IDENTIFICACIÓN (INE)', onChange: setIne },
        { num: 2, label: 'CURP', onChange: setCurp },
        { num: 3, label: 'ACTA DE NACIMIENTO', onChange: setActa },
        { num: 4, label: 'COMPROBANTE DE DOMICILIO', onChange: setComprobante },
      ].map((item) => (
        <div className="campo-doc" key={item.num}>
          <span className="numero-circulo">{item.num}</span>
          <label className="label-documento">{item.label}:</label>
          <input
            type="file"
            accept=".pdf"
            className="input-documento"
            onChange={(e) => validarPDF(e.target.files[0], item.onChange)}
          />
        </div>
      ))}

      <div className="contenedor-boton-guardar">
        <button className="boton-siguiente" onClick={handleSubmit}>
          <FaSave style={{ marginRight: '8px' }} />
          Guardar
        </button>
      </div>

      {mostrarToast && (
        <div className="overlay-toast">
          <div className="toast-modal">
            <div className="icono-check">
              {tipoMensaje === 'exito' ? (
                <FaCheckCircle style={{ color: '#28a745', fontSize: '40px' }} />
              ) : (
                <FaTimesCircle style={{ color: '#dc3545', fontSize: '40px' }} />
              )}
            </div>
            <h3>{mensaje}</h3>
            <button className="cerrar-btn" onClick={cerrarModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fase1Documentos;
