import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Registro from './pages/registro';
import AdminPanel from './pages/admin/adminPanel';
import UsuarioPanel from './pages/usuario/usuarioPanel';
import FormularioPrincipal from './pages/usuario/FormularioPrincipal';
import VistaProyectos from './pages/usuario/VistaProyectos';
import VistaEntrevista from './pages/usuario/VistaEntrevista';
import VistaResultados from './pages/usuario/VistaResultados';
import DashboardUsuario from './pages/usuario/DashboardUsuario';
// import fasedos from './pages/usuario/VistaFase2';
import Aceptar_Usuarios from './pages/admin/Aceptar_Usuarios';
import Proceso_seleccion from './pages/admin/Proceso_seleccion';
import UsuariosRegistrados from './pages/admin/UsuariosRegistrados';
import UsuariosAgendados from './pages/admin/UsuariosAgendados';
import UsuariosSeleccionados from './pages/admin/UsuariosSeleccionados';
import Postulantes from './pages/admin/Postulantes'; 
import SeleccionIndividual from './pages/admin/SeleccionIndividual'; // esta es la vista de edición por id
import VistaPostulantes from './pages/admin/VistaPostulantes';
import confirmacion_final from './pages/usuario/ConfirmacionFinal';
import EvaluacionEntrevista from './pages/admin/EvaluacionEntrevista'; // Asegúrate de que esta ruta sea correcta
import VistaEvaluaciones from './pages/admin/VistaEvaluaciones';
import BuscarEntrevistas from './pages/admin/BuscarEntrevistas'; // Importar tu vista
import FasesProceso from './pages/usuario/FasesProceso';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/usuario" element={<UsuarioPanel />} />
        <Route path="/usuario/formulario" element={<FormularioPrincipal />} />
        <Route path="/usuario/proyectos" element={<VistaProyectos />} />
        <Route path="/usuario/entrevista" element={<VistaEntrevista />} />
        <Route path="/usuario/resultados" element={<VistaResultados />} />
        <Route path="/usuario/dashboard" element={<DashboardUsuario />} />
        {/* <Route path="/usuario/fase2" element={<fasedos />} /> */}
        <Route path="/admin/aceptar_usuarios" element={<Aceptar_Usuarios />} />
        <Route path="/admin/proceso_seleccion" element={<Proceso_seleccion />} />
        <Route path="/admin/usuarios-registrados" element={<UsuariosRegistrados />} />
        <Route path="/admin/usuarios-agendados" element={<UsuariosAgendados />} />
        <Route path="/admin/usuarios-seleccionados" element={<UsuariosSeleccionados />} />
        <Route path="/admin/postulantes" element={<Postulantes />} />
        {/* 3.1*/}
        <Route path="/admin/seleccion/:id" element={<SeleccionIndividual />} />
        <Route path="/admin/Vistapostulantes" element={<VistaPostulantes />} />
        <Route path="/usuario/confirmacion-final" element={<confirmacion_final />} />
        <Route path="/admin/evaluacion/:id" element={<EvaluacionEntrevista />} />
        <Route path="/admin/evaluaciones" element={<VistaEvaluaciones />} />
        <Route path="/admin/buscar-evaluacion" element={<BuscarEntrevistas />} />
        
        <Route path="/usuario/fases-proceso" element={<FasesProceso/>} />




      </Routes>
    </BrowserRouter>
  );
}

export default App;
