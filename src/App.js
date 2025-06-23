import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Registro from './pages/registro';
import AdminPanel from './pages/admin/adminPanel';
import UsuarioPanel from './pages/usuario/usuarioPanel';
import FormularioPrincipal from './pages/usuario/FormularioPrincipal';
import VistaProyectos from './pages/usuario/VistaProyectos';
import VistaEntrevista from './pages/usuario/VistaEntrevista';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
