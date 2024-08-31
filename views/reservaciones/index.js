document.addEventListener('DOMContentLoaded', async () => {
  const citasContainer = document.getElementById('citas-container');
  const loadingMessage = document.createElement('p');
  loadingMessage.textContent = 'Cargando reservas...';
  citasContainer.appendChild(loadingMessage);

  try {
    const response = await axios.get('/api/citas');
    const citas = response.data;
    console.log(citas);
    
    citas.forEach((cita) => {
      const citaHTML = `
        <div class="mb-4">
          <h3 class="text-lg font-bold">${cita.service.name}</h3>
          <p>Descripción: ${cita.service.description}</p>
          <p>Fecha: ${cita.date}</p>
          <p>Precio: ${cita.service.price}</p>
          <p><strong>Cliente:</strong> ${cita.user.name}</p>
          <p><strong>Email:</strong> ${cita.user.email}</p>
          <p><strong>Monto pagado:</strong> ${cita.pay}Bs.</p>
          <p><strong>Referencia:</strong> ${cita.ref}</p>
        </div>
      `;
      const citaElement = document.createElement('div');
      citaElement.classList.add('bg-blue-400', 'p-4', 'rounded-lg', 'w-full', 'md:w-full', 'lg:w-full', 'mb-4');
      citaElement.innerHTML = citaHTML;
      
      citasContainer.appendChild(citaElement);
    });

    citasContainer.removeChild(loadingMessage);
  } catch (error) {
    console.error('Error al obtener las reservas:', error);
    loadingMessage.textContent = 'Error al cargar las reservas. Inténtalo de nuevo más tarde.';
  }
});