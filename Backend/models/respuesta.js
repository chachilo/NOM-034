const mongoose = require('mongoose');

const respuestaSchema = new mongoose.Schema({
  nombre: { type: String, required: true }, // Nombre del trabajador
  tipo: { type: String, required: true }, // Tipo de cuestionario
  respuestas: { type: Object, required: true }, // Respuestas del usuario
  resultado: { type: String, required: true }, // Resultado calculado
  fecha: { type: Date, default: Date.now }, // Fecha de la respuesta
});

module.exports = mongoose.model('Respuesta', respuestaSchema);