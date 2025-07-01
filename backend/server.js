const express = require('express');
const cors = require('cors');
// const db = require('./db'); // Se conecta a la base de datos
const path = require('path'); // Importante para servir archivos correctamente
// require('./db'); // Ejecuta la conexión con la base de datos


const app = express();
app.use(cors());
app.use(express.json());

//  Servir correctamente archivos como PDFs (CVs) desde la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
const authRoutes = require('./routes/auth');
const formularioRoutes = require('./routes/formulario'); 
const entrevistaRoutes = require('./routes/entrevista');
// const aceptarUsuariosRoutes = require('./routes/aceptar_usuarios');
const estadoRoutes = require('./routes/estado');
const usuariosAdminRoutes = require('./routes/Admin/usuarios');
const agendadosRoutes = require('./routes/Admin/agendados');
const areasRoutes = require('./routes/areas');
const seleccionRoutes = require('./routes/Admin/seleccion');
const seleccionadosRoutes = require('./routes/Admin/seleccionados');
const aceptadosRoutes = require('./routes/aceptados');
const resumenPostuladosRoutes = require('./routes/Admin/resumenPostulados');
const proyectosRoutes = require('./routes/proyectos');
const confirmacionFinalRoutes = require('./routes/confirmacionFinalRoutes');
const evaluacionRoutes = require('./routes/Admin/evaluacion');
const postulantesRouter = require('./routes/Admin/postulantes');




// Usar rutas
app.use('/api/admin/postulantes', postulantesRouter);
app.use('/api/evaluacion', evaluacionRoutes);
app.use('/api/fase-final', confirmacionFinalRoutes);
app.use('/api/proyectos', proyectosRoutes);
app.use('/api/resumen', resumenPostuladosRoutes);
// app.use('/api/postulantes', require('./routes/Admin/postulantes'));
app.use('/api/aceptados', aceptadosRoutes);
app.use('/api/admin/seleccionados', seleccionadosRoutes);
app.use('/api/seleccion', seleccionRoutes);
app.use('/api/areas', areasRoutes);
app.use('/api', agendadosRoutes);
app.use('/api/admin/usuarios', usuariosAdminRoutes);
app.use('/api/estado', estadoRoutes);
// app.use('/api/aceptar_usuarios', aceptarUsuariosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/formulario', formularioRoutes);
app.use('/api/entrevista', entrevistaRoutes);


// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor backend activo ');
});

// Iniciar servidor
app.listen(3001, () => {
  console.log('Conectado a la base de datos MySQL');
  console.log('Backend escuchando en http://localhost:3001');
});
