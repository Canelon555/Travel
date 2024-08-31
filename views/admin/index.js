// Función para obtener el ID del administrador (puedes adaptarla según tu lógica)
function obtenerAdminId() {
  // Por ejemplo, si tienes un token de autenticación JWT almacenado en el cliente,
    // puedes extraer el ID del administrador del token y devolverlo aquí
    // Aquí un ejemplo básico:
    const token = localStorage.getItem('jwtToken'); // Suponiendo que el token está almacenado en el localStorage
    // Decodificar el token para obtener el ID del administrador
    // Aquí deberías agregar tu lógica real para decodificar el token y obtener el ID del administrador
    const decodedToken = token ? jwt_decode(token) : null;
    // Devolver el ID del administrador (o null si no se encuentra)
    return decodedToken ? decodedToken.adminId : null;
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Obtener servicios y mostrarlos
    const serviceResponse = await axios.get('/api/services', { withCredentials: true });
    const services = serviceResponse.data;
    const listService = document.getElementById('list-service');

    services.forEach(service => {
      mostrarServicio(service, listService);
    });

      // Obtener citas y mostrarlas
      const response = await axios.get('/api/citas', {
      withCredentials: true });
      const citas = response.data;
      console.log(citas);

      if (citas.length > 0) {
        citas.forEach(cita => {
          mostrarCita(cita);
        });
        document.getElementById('titulo-citas').style.display = 'block';
      } else {
        document.getElementById('titulo-citas').style.display = 'none';
      }
  } catch (error) {
    console.error('Error al cargar la pagina:', error);
  }
});

function mostrarCita(cita) {
  const citasContainer = document.getElementById('citas-container');

  const citaElement = document.createElement('div');
  citaElement.classList.add('bg-blue-400', 'p-4', 'rounded-lg', 'w-full', 'md:w-full', 'lg:w-full', 'mb-4', 'mx-0');

  const citaContent = `
    <div class="text-sm">
      ${cita.user ? `
          <p class="text-sm"><strong>Cliente:</strong> ${cita.user.name}</p>
          <p class="text-sm"><strong>Email:</strong> ${cita.user.email}</p>
      ` : ''}
      <p class="text-sm"><strong>Fecha:</strong> ${cita.date}</p>
      <p class="text-sm"><strong>Servicio:</strong> ${cita.service.name}</p>
      <p class="text-sm"><strong>Duración:</strong> ${cita.service.description}</p>
      <p class="text-sm"><strong>Precio:</strong> ${cita.service.price}</p>
      <p class="text-sm"><strong>Monto pagado:</strong> ${cita.pay}Bs</p>
      <p class="text-sm"><strong>Referencia:</strong> ${cita.ref}</p>
    </div>
    <button class="p-2 delete-cita-btn transition ease-in-out hover:bg-red-500 bg-red-600 text-black px-3 py-1 rounded mt-2">Eliminar</button>
  `;

  citaElement.innerHTML = citaContent;

  const deleteCitaBtn = citaElement.querySelector('.delete-cita-btn');
  deleteCitaBtn.addEventListener('click', async function() {
    try {
      citaElement.remove();

      const response = await axios.delete(`/api/citas/${cita.id}`, { withCredentials: true });
      if (response.status === 200) {
        console.log('La reserva ha sido eliminada exitosamente de la base de datos.');
      } else {
          console.error('Error al eliminar la reserva de la base de datos:', response.statusText);
          throw new Error('Error al eliminar la reserva de la base de datos');
      }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
  });

  citasContainer.appendChild(citaElement);

}

// Función para mostrar un servicio en el DOM
// agregar un arrays, fijarse en el video de la lista de tareas con get
function mostrarServicio(service, listService) {
  const div = document.createElement('div');
  div.innerHTML = `
  <div class="flex flex-col">
            <h3 class="font-medium text-xl mb-1 text-black service-name">${service.name}</h3>
            <p class="text-sm mb-1 text-black service-description">${service.description}</p>
            <p class="font-medium text-sm text-black service-price">${service.price}</p>
            
        </div>
        <div>
            <a class="delete-btn cursor-pointer font-bold  text-white px-3 py-1 rounded-full" data-service-id="${service.id}" data-service-name="${service.name}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 bg-red-700 p-1 rounded-lg hover:bg-stone-500 delete-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            </a>
            <a class="edit-btn cursor-pointer font-bold text-white px-3 py-1 rounded-full" data-service-id="${service.id}" data-service-name="${service.name}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 bg-green-700p-1 rounded-lg hover:bg-stone-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            </a>
        </div>
  `;
    div.classList.add('bg-blue-400', 'rounded-xl', 'border', 'border-1', 'border-stone-600', 'px-4', 'py-2', 'mb-2', 'flex', 'items-center', 'justify-between', 'text-black');

  // Agregar controlador de eventos al botón de eliminación
  const deleteButton = div.querySelector('.delete-btn');
  deleteButton.addEventListener('click', async function(event) {
    event.preventDefault();
    const serviceId = deleteButton.getAttribute('data-service-id');
    const serviceName = deleteButton.getAttribute('data-service-name');
    const serviceElement = div;

    try {
      // Eliminar el servicio del DOM
      serviceElement.remove();

      // Enviar solicitud para eliminar el servicio de la base de datos
      const response = await axios.delete(`/api/services/${serviceId}`, { withCredentials: true });
      if (response.status === 200) {
        console.log('El servicio ha sido eliminado exitosamente.');
      } else { 
        console.error('Error al eliminar el servicio:', response.statusText);
        throw new Error('Error al eliminar el servicio');    
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      // Manejar errores
    }
  });

  listService.appendChild(div);
};
// Editar
document.addEventListener('click', async function(e) {
  if (e.target.closest('.edit-btn')) {
      const editBtn = e.target.closest('.edit-btn');
      console.log(editBtn); // ¿Qué se imprime aquí?
      const serviceContainer = editBtn.closest('.bg-blue-400');
      console.log(serviceContainer); // ¿Qué se imprime aquí?
       // Encontrar el contenedor del servicio
      const editName = serviceContainer.querySelector('.service-name');// Acceder al nombre del servicio dentro del contenedor
      const editDescription = serviceContainer.querySelector('.service-description');// Acceder a la duración del servicio dentro del contenedor
      const editPrice = serviceContainer.querySelector('.service-price');// Acceder al precio del servicio dentro del contenedor

      // Verificar si los elementos existen antes de intentar acceder a ellos
      if (editName && editDescription && editPrice) {
        if (!editBtn.classList.contains('editando')) {
          editBtn.classList.add('editando');
          editName.contentEditable = true;
          editDescription.contentEditable = true;
          editPrice.contentEditable = true;
          editName.focus(); // Enfocar el campo para editar
          // Cambiar el icono al hacer clic en el botón de editar
          editBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
          `;
        } else {
          editBtn.classList.remove('editando');
            editName.contentEditable = false;
            editDescription.contentEditable = false;
            editPrice.contentEditable = false;
            // Cambiar el botón al estado inicial
            editBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 bg-green-700p-1 rounded-lg hover:bg-stone-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
          `;
          // Obtener los valores editados
          const editedService = {
              id: editBtn.getAttribute('data-service-id'),
              service: editName.textContent,
              description: editDescription.textContent,
              price: editPrice.textContent,
          };
          // Intentar guardar los cambios
          try {
              const response = await axios.put(`/api/services/${editedService.id}`, editedService, { withCredentials: true });

              if (response.status === 200) {
                  console.log('Cambios guardados exitosamente.');
              } else {
                  console.error('Error al guardar los cambios:', response.statusText);
                  throw new Error('Error al guardar los cambios');
              }
          } catch (error) {
              console.error('Error en la solicitud:', error);
          }
        }
      }
  }
});

const submitBtn = document.querySelector('#submit-button');
const serviceName = document.querySelector('#service-name');
const serviceDescription = document.querySelector('#service-description');
const servicePrice = document.querySelector('#service-price');

const validateInputFields = () => {
  if (serviceName.value !== '' && serviceDescription.value !== '' && servicePrice.value !== '') {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
};

serviceName.addEventListener('input', validateInputFields);
serviceDescription.addEventListener('input', validateInputFields);
servicePrice.addEventListener('input', validateInputFields);

// Función para agregar un nuevo servicio
document.getElementById('service-form').addEventListener('submit', async function(event){
  event.preventDefault(); // Evitar que el formulario se envíe y la página se recargue

  try {
    const name = document.getElementById('service-name').value;
    const description = document.getElementById('service-description').value;
    const price = document.getElementById('service-price').value;

    const newService = {
      name: name,
      description: description,
      price: price,
    };

    const response = await axios.post('/api/services', newService, {
      withCredentials: true });

    if (response.status === 201) {
      const responseData = response.data;
      mostrarServicio(responseData, document.getElementById ('list-service'));// Mostrar el nuevo servicio en el DOM
      this.reset();// Restablecer el formulario
    } else {
      console.error('Error al agregar el  servicio:', response.statusText);
      throw new Error('Error al agregar el servicio');
    }
  } catch (error) {
      console.error('Error en la solicitud:', error);
      mostrarMensajeError('No se puede crear el mismo servicio dos veces');
  }
});

// Función para mostrar un mensaje de error
function mostrarMensajeError(mensaje) {
  // Implementa esta función según tus necesidades
}