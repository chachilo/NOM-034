const express = require('express');
const router = express.Router();
const Respuesta = require('../../models/respuesta'); // Ajusta la ruta al modelo

// Guardar respuestas
router.post('/respuestas', async (req, res) => {
  const { nombre, tipo, respuestas, resultado } = req.body;

  // Validar que los campos requeridos estén presentes
  if (!nombre || !tipo || !respuestas || !resultado) {
    return res.status(400).json({ error: 'Faltan campos requeridos: nombre, tipo, respuestas o resultado' });
  }

  try {
    // Crear una nueva respuesta
    const nuevaRespuesta = new Respuesta({ nombre, tipo, respuestas, resultado });
    await nuevaRespuesta.save(); // Guardar en MongoDB

    // Respuesta exitosa
    res.status(201).json({ mensaje: 'Respuestas guardadas correctamente', data: nuevaRespuesta });
  } catch (error) {
    console.error('Error al guardar las respuestas:', error);
    res.status(500).json({ error: 'Error al guardar las respuestas' });
  }
});

// Obtener todas las respuestas
router.get('/respuestas', async (req, res) => {
  try {
    const respuestas = await Respuesta.find(); // Obtener todas las respuestas
    res.status(200).json(respuestas);
  } catch (error) {
    console.error('Error al obtener las respuestas:', error);
    res.status(500).json({ error: 'Error al obtener las respuestas' });
  }
});

module.exports = router;