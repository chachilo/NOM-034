document.getElementById('psicosocialForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que el formulario se reinicie
  
    // Obtener el nombre y las respuestas del formulario
    const nombre = document.getElementById('nombre').value;
    const respuestas = {
      pregunta1: parseInt(document.getElementById('pregunta1').value),
      pregunta2: parseInt(document.getElementById('pregunta2').value),
      pregunta3: parseInt(document.getElementById('pregunta3').value),
    };
  
    // Lógica de cálculo
    const puntajeTotal = Object.values(respuestas).reduce((total, valor) => total + valor, 0);
  
    let nivelRiesgo;
    if (puntajeTotal <= 3) {
      nivelRiesgo = "Bajo riesgo psicosocial.";
    } else if (puntajeTotal <= 6) {
      nivelRiesgo = "Medio riesgo psicosocial.";
    } else {
      nivelRiesgo = "Alto riesgo psicosocial.";
    }
  
    // Guardar resultado en localStorage
    localStorage.setItem('resultadoPsicosocial', nivelRiesgo);
  
    // Enviar respuestas al backend
    try {
      const response = await fetch('http://localhost:3000/api/cuestionario/respuestas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre, // Nombre del trabajador
          tipo: 'psicosocial', // Tipo de cuestionario
          respuestas: respuestas, // Respuestas del usuario
          resultado: nivelRiesgo, // Resultado calculado
        }),
      });
  
      const data = await response.json();
      console.log(data.mensaje); // Mostrar mensaje de éxito en la consola
  
      // Redirigir al reporte después de enviar los datos
      window.location.href = '../pages/reporte.html';
    } catch (error) {
      console.error('Error al enviar las respuestas:', error);
      alert('Error al enviar las respuestas');
    }
  });