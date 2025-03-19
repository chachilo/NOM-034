export function renderApp() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="card custom-card">
        <div class="card-body">
          <h1 class="card-title">Cuestionario NOM-035</h1>
          <form id="cuestionarioForm">
            <div class="mb-3">
              <label for="pregunta1" class="form-label">¿Se siente estresado en el trabajo?</label>
              <select class="form-select" id="pregunta1" name="pregunta1">
                <option value="1">Sí</option>
                <option value="0">No</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">Enviar</button>
          </form>
        </div>
      </div>
    `;
  
    const form = document.getElementById('cuestionarioForm');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const respuesta1 = document.getElementById('pregunta1').value;
  
      // Enviar respuestas al backend
      const respuestas = { pregunta1: respuesta1 };
      await enviarRespuestas(respuestas);
    });
  }
  
  async function enviarRespuestas(respuestas) {
    try {
      const response = await fetch('http://localhost:3000/api/cuestionario/respuestas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ respuestas }),
      });
      const data = await response.json();
      console.log(data.mensaje);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  document.getElementById('traumaticosForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const respuestas = {
      pregunta1: document.getElementById('pregunta1').value,
      pregunta2: document.getElementById('pregunta2').value,
    };
  
    try {
      const response = await fetch('http://localhost:3000/api/cuestionario/traumaticos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(respuestas),
      });
      const data = await response.json();
      alert(data.mensaje);
    } catch (error) {
      console.error('Error:', error);
    }
  });

  document.getElementById('psicosocialForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const respuestas = {
      pregunta1: parseInt(document.getElementById('pregunta1').value),
      pregunta2: parseInt(document.getElementById('pregunta2').value),
    };
  
    // Calcular puntaje total
    const puntajeTotal = respuestas.pregunta1 + respuestas.pregunta2;
  
    // Clasificar riesgo
    let riesgo;
    if (puntajeTotal >= 5) riesgo = 'Alto';
    else if (puntajeTotal >= 3) riesgo = 'Medio';
    else riesgo = 'Bajo';
  
    try {
      const response = await fetch('http://localhost:3000/api/cuestionario/psicosocial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...respuestas, riesgo }),
      });
      const data = await response.json();
      alert(`Riesgo: ${riesgo}\n${data.mensaje}`);
    } catch (error) {
      console.error('Error:', error);
    }
  });