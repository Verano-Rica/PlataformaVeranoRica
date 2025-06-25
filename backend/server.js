const express = require('express');
const cors = require('cors');
const db = require('./db'); // Se conecta a la base de datos

const app = express();
app.use(cors());
app.use(express.json());
 app.use('/uploads', express.static('uploads'));

// Rutas
const authRoutes = require('./routes/auth');
const formularioRoutes = require('./routes/formulario'); 
const entrevistaRoutes = require('./routes/entrevista');
const aceptadosRoutes = require('./routes/aceptados');

app.use('/api/aceptados', aceptadosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/formulario', formularioRoutes);
app.use('/api/entrevista', entrevistaRoutes);
app.use('/uploads', express.static('uploads'));


// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor backend activo ');
});

// Iniciar servidor
app.listen(3001, () => {
  console.log('Conectado a la base de datos MySQL');
  console.log('Backend escuchando en http://localhost:3001');
});
