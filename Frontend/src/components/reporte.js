document.addEventListener('DOMContentLoaded', async () => {
    try {
      // Obtener las respuestas desde el backend
      const response = await fetch('http://localhost:3000/api/cuestionario/respuestas');
  
      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        throw new Error(`Error al obtener las respuestas: ${response.statusText}`);
      }
  
      const respuestas = await response.json();
  
      // Verificar si hay respuestas
      if (!respuestas || respuestas.length === 0) {
        console.warn('No hay respuestas para mostrar.');
        return;
      }
  
      // Mostrar las respuestas en la tabla
      const resultadosBody = document.getElementById('resultadosBody');
      resultadosBody.innerHTML = respuestas
        .map((respuesta) => `
          <tr>
            <td>${respuesta.nombre || "No disponible"}</td>
            <td>${respuesta.tipo || "No disponible"}</td>
            <td>${JSON.stringify(respuesta.respuestas) || "No disponible"}</td>
            <td>${respuesta.resultado || "No disponible"}</td>
            <td>${respuesta.fecha ? new Date(respuesta.fecha).toLocaleString() : "No disponible"}</td>
          </tr>
        `)
        .join('');
    } catch (error) {
      console.error('Error al obtener las respuestas:', error);
  
      // Mostrar un mensaje de error en la interfaz
      const resultadosBody = document.getElementById('resultadosBody');
      resultadosBody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center text-danger">Error al cargar los resultados. Inténtelo de nuevo más tarde.</td>
        </tr>
      `;
    }
  });