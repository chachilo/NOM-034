const express = require('express');
const router = express.Router();
const Respuesta = require('../models/respuesta');

// Guardar respuestas
router.post('/respuestas', async (req, res) => {
  const { tipo, respuestas, resultado } = req.body;

  // Validar que los campos requeridos estén presentes
  if (!tipo || !respuestas || !resultado) {
    return res.status(400).json({ error: 'Faltan campos requeridos: tipo, respuestas o resultado' });
  }

  try {
    // Crear una nueva respuesta
    const nuevaRespuesta = new Respuesta({ tipo, respuestas, resultado });
    await nuevaRespuesta.save(); // Guardar en MongoDB

    // Respuesta exitosa
    res.status(201).json({ mensaje: 'Respuestas guardadas correctamente', data: nuevaRespuesta });
  } catch (error) {
    console.error('Error al guardar las respuestas:', error);
    res.status(500).json({ error: 'Error al guardar las respuestas' });
  }
});

module.exports = router;