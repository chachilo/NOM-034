document.getElementById('traumaticosForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita que el formulario se reinicie

  // Obtener el nombre y las respuestas del formulario
  const nombre = document.getElementById('nombre').value;
  const respuestas = {
    pregunta1: document.getElementById('pregunta1').value,
    pregunta2: document.getElementById('pregunta2').value,
    pregunta3: document.getElementById('pregunta3').value,
  };

  // Lógica de cálculo
  const puntaje = Object.values(respuestas).reduce((total, valor) => total + parseInt(valor), 0);

  let resultado;
  if (puntaje >= 2) {
    resultado = "Alto riesgo de exposición a eventos traumáticos.";
  } else {
    resultado = "Bajo riesgo de exposición a eventos traumáticos.";
  }

  // Guardar resultado en localStorage
  localStorage.setItem('resultadoTraumaticos', resultado);

  // Enviar respuestas al backend
  try {
    const response = await fetch('http://localhost:3000/api/cuestionario/respuestas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: nombre, // Nombre del trabajador
        tipo: 'traumaticos', // Tipo de cuestionario
        respuestas: respuestas, // Respuestas del usuario
        resultado: resultado, // Resultado calculado
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