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
import fasedos from './pages/usuario/VistaFase2';
import VistaInscritos from './pages/admin/VistaInscritos';

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
        <Route path="/usuario/fase2" element={<fasedos />} />
        <Route path="/admin/inscritos" element={<VistaInscritos />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
