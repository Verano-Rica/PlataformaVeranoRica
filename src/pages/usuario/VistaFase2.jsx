// import React from 'react';
// import '../../styles/usuarioPanel.css';
// import '../../styles/resultados.css'; // archivo nuevo
// import logoExperiencia from '../../assets/logo-experiencia.png';
// import { useNavigate } from 'react-router-dom';

// const VistaResultados = () => {
//   const navigate = useNavigate();

//   // Ejemplo: podrías obtener estado por props o consulta a BD
//   const estadoFase1 = 'aceptado'; // 'rechazado' o 'pendiente'
//   const estadoFase2 = 'pendiente';
//   const estadoFase3 = 'pendiente';
//   const estadoFase4 = 'pendiente';

//   const fases = [
//     { numero: 1, nombre: 'Formulario', estado: estadoFase1 },
//     { numero: 2, nombre: 'Talla de playera', estado: estadoFase2 },
//     { numero: 3, nombre: 'Disponibilidad', estado: estadoFase3 },
//     { numero: 4, nombre: 'Prueba psicométrica', estado: estadoFase4 },
//   ];

//   const getColor = (estado) => {
//     if (estado === 'aceptado') return 'verde';
//     if (estado === 'rechazado') return 'rojo';
//     return 'gris';
//   };

//   return (
//     <div className="vista-resultados-container">
//       <header className="header-resultados">
//         <img src={logoExperiencia} alt="Logo experiencia" className="logo-resultados" />
//         <h2>Bienvenido a la experiencia de Verano RICA 2026</h2>
//       </header>

//       <section className="timeline-fases">4
//         {fases.map((fase, idx) => (
//           <div key={idx} className="fase-card">
//             <div className={`fase-circle ${getColor(fase.estado)}`}>{fase.numero}</div>
//             <p className="fase-nombre">{fase.nombre}</p>
//           </div>
//         ))}
//       </section>

//       <footer className="footer">
//         <p>&copy; 2026 Experiencia Verano RICA · Todos los derechos reservados</p>
//       </footer>
//     </div>
//   );
// };

// export default VistaResultados;
