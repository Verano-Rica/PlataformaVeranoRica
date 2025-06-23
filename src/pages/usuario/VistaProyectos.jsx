import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import '../../styles/usuarioPanel.css';
import '../../styles/proyectos.css';


const proyectos = [
  { id: 1, titulo: 'Proyecto 1: Desarrollo Web', descripcion: 'Construcción de páginas web responsivas y modernas.' },
  { id: 2, titulo: 'Proyecto 2: Relaciones Laborales', descripcion: 'Gestión de relaciones laborales dentro de la organización.' },
  { id: 3, titulo: 'Proyecto 3: Control de Calidad', descripcion: 'Supervisión de procesos para asegurar calidad del producto.' },
  { id: 4, titulo: 'Proyecto 4: Innovación de Productos', descripcion: 'Diseño de nuevos productos con enfoque en el usuario.' },
  { id: 5, titulo: 'Proyecto 5: Sustentabilidad', descripcion: 'Acciones para mejorar el impacto ambiental de la empresa.' },
  { id: 6, titulo: 'Proyecto 6: Finanzas Rurales', descripcion: 'Apoyo a comunidades rurales mediante educación financiera.' },
  { id: 7, titulo: 'Proyecto 7: Logística', descripcion: 'Optimización de rutas y distribución en almacenes.' },
  { id: 8, titulo: 'Proyecto 8: Automatización', descripcion: 'Uso de tecnología para automatizar procesos internos.' }
];


const VistaProyectos = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const nombre = 'Bienvenido(a): Larisa Moreno Zamora';


  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const handleLogout = () => (window.location.href = '/');


  return (
    <div className={`panel-container ${menuAbierto ? 'menu-activo' : ''}`}>
      <Sidebar />


      <div className="panel-contenido">
        <Header nombre={nombre} toggleMenu={toggleMenu} handleLogout={handleLogout} />


        <main className="main-contenido">
          <div className="zigzag-container">
            {proyectos.map((proy, index) => (
              <div key={proy.id} className={`zigzag-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="numero-proyecto">{proy.id}</div>
                <div className="texto-proyecto">
                  <h3>{proy.titulo}</h3>
                  <p>{proy.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </main>


        <Footer />
      </div>
    </div>
  );
};


export default VistaProyectos;