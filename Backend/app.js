const express = require('express');
const cors = require('cors'); // Importar cors
const mongoose = require('mongoose');
const cuestionarioRoutes = require('./api/cuestionario/respuestas'); // Importar las rutas

const app = express();

// Habilitar CORS
app.use(cors());

// Middleware para manejar JSON
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/nom035', {
})
  .then(() => console.log('Conexión a MongoDB establecida'))
  .catch((error) => console.error('Error conectando a MongoDB:', error));

// Rutas
app.use('/api/cuestionario', cuestionarioRoutes); // Usar la ruta

// Manejo de errores (opcional pero recomendado)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

// Ruta de prueba (opcional)
app.get('/', (req, res) => {
  res.send('¡Bienvenido al backend de NOM-035!');
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});