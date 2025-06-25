// import React, { useEffect, useState } from 'react';
// import VistaFase2 from './VistaFase2';
// import UsuarioPanel from './usuarioPanel';

// const DashboardUsuario = () => {
//   const [usuario, setUsuario] = useState(null);
//   const [cargando, setCargando] = useState(true);

//   useEffect(() => {
//     const correo = localStorage.getItem('correoUsuario'); // <- correo guardado en login

//     if (!correo) {
//       console.error('No hay correo en localStorage');
//       setCargando(false);
//       return;
//     }

//     const obtenerUsuario = async () => {
//       try {
//         const respuesta = await fetch(`http://localhost:3001/api/usuario?correo=${correo}`);
//         const data = await respuesta.json();
//         setUsuario(data);
//       } catch (error) {
//         console.error('Error al cargar el usuario:', error);
//       } finally {
//         setCargando(false);
//       }
//     };

//     obtenerUsuario();
//   }, []);

//   if (cargando) return <p>Cargando...</p>;

//   if (usuario && usuario.estado === 'aceptado') {
//     return <VistaFase2 />;
//   }

//   return <UsuarioPanel />;
// };

// export default DashboardUsuario;
