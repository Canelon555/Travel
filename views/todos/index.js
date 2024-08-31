document.addEventListener('DOMContentLoaded', async function() {
  const listService = document.getElementById('list-service');
  const payBtn = document.getElementById('pay-btn'); // Botón de pagar
  const payOfficeBtn = document.getElementById('pay-office-btn');
  const totalPriceCitasElement = document.getElementById('total-price-citas-value');
  const totalPriceElement = document.getElementById('total-price-value');
  const selectedDateElement = document.getElementById('selected-date');
  const selectedPayElement = document.querySelector('.selected-pay');
  const selectedRefElement = document.querySelector('.selected-ref');
  const cartItemsContainer = document.getElementById('cart-items');
  const acceptBtn = document.getElementById('accept-btn');
  const hiddenDiv = document.querySelector('.view');

  // Función para habilitar o deshabilitar el botón de aceptar según el estado del carrito
  function toggleAcceptButton() {
    if (cartItemsContainer.children.length === 0) {
      // Si el carrito está vacío, deshabilitar el botón de aceptar
      acceptBtn.disabled = true;
    } else {
      // Si el carrito no está vacío, habilitar el botón de aceptar
      acceptBtn.disabled = false;
    }
  }

  acceptBtn.addEventListener('click', function() {
    // Remover la clase 'hidden' del elemento
    hiddenDiv.classList.remove('hidden');
    // Agregar la clase de animación de entrada de Animate.css
    hiddenDiv.classList.add('animate__animated', 'animate__fadeIn');

    // Hacer scroll hasta el elemento visible
    hiddenDiv.scrollIntoView({ behavior: 'smooth' });
  });

// Llamar a la función para establecer el estado inicial del botón de aceptar
  toggleAcceptButton();

  let totalPrice = 0;
  let services;
  let selectedService = null; // Array para almacenar los servicios seleccionados
  let selectedDate;
  let selectedPay;
  let selectedRef;

  try {
    const response = await axios.get('/api/services', {
    withCredentials: true });
    services = response.data;

    for (const service of services) {
      const div = document.createElement('div');
      div.innerHTML = `
        <div class="flex flex-col">
          <h3 class="font-medium text-xl mb-1 text-black service-name">${service.name}</h3>
          <p class="text-sm mb-1 text-black service-description">${service.description}</p>
          <p class="font-medium text-sm text-black service-price">${service.price}</p>
        </div>
        <div>
          <button class="transition ease-in-out plus-btn bg-stone-700 hover:bg-stone-500 text-white px-3 py-1 rounded-full" data-service-id="${service.id}" data-service-price="${service.price}" data-service-description="${service.description}" data-service-name="${service.name}">+</button>
        </div>
      `;
      div.classList.add('bg-blue-400', 'rounded-xl', 'border', 'border-1', 'border-stone-600', 'px-4', 'py-2', 'mb-2', 'flex', 'items-center', 'justify-between', 'text-black');
      listService.appendChild(div);
    }

    listService.addEventListener('click', async function(event) {
      if (event.target.classList.contains('plus-btn')) {
        const serviceName = event.target.dataset.serviceName; // Obtener el nombre del servicio desde el atributo data-service-name
        // const serviceDescription = event.target.dataset.serviceDescription;
        const servicePrice = parseFloat(event.target.dataset.servicePrice);
        const selectedServiceTemp = services.find(service => service.name === serviceName); // Buscar el servicio por nombre
        
        if (selectedServiceTemp) {
          if (selectedService) {
            const cartItem = cartItemsContainer.querySelector(`[data-service-name="${selectedService.name}"]`);
            cartItem.remove();
          }
            // Agregar el servicio seleccionado al array
            selectedService = selectedServiceTemp;

            totalPrice = servicePrice;
            totalPriceElement.textContent = totalPrice.toFixed(2);

            // Mostrar el servicio seleccionado en el primer carrito
            const cartItemElement = document.createElement('li');
            cartItemElement.innerHTML = `
              <div class="flex flex-col p-3 justify-between border border-black rounded-lg relative">
                <p class="font-bold">${selectedService.name}</p>  
                <p class="font-semibold">${selectedService.description}</p>  
                <p class="font-semibold">${selectedService.price}</p>
              </div>
            `;
            cartItemElement.dataset.serviceName = selectedService.name;
            cartItemsContainer.appendChild(cartItemElement);

            // Mostrar los detalles del servicio en el segundo carrito si existe
            const selectedServicesList = document.getElementById('selected-services-list');
            if (selectedServicesList) {
              selectedServicesList.innerHTML = '';
              const cartItemDetails = document.createElement('li');
              cartItemDetails.innerHTML = `
                <div class="flex flex-col p-2 w-full justify-between border border-black rounded-lg">
                  <p class="font-bold">${selectedService.name}</p>  
                  <p class="font-semibold">${selectedService.description}</p>  
                  <p class="font-semibold">${selectedService.price}</p>
                </div>
              `;
              cartItemDetails.classList.add('p-2', 'flex', 'items-center', 'justify-between', 'font-bold');
              selectedServicesList.appendChild(cartItemDetails);

              // Agregar el precio total al segundo carrito
              const totalPriceElementCitas = document.getElementById('total-price-citas');
              if (totalPriceElementCitas) {
                  totalPriceElementCitas.textContent = totalPrice.toFixed(2);
              }
              }

            toggleAcceptButton();
          }
        }
    });
  
        // Llamar a la función para actualizar el estado del botón de aceptar después de modificar el carrito
        function toggleAcceptButton() {
          if (selectedService === null) {
            acceptBtn.disabled = true;
          } else {
            acceptBtn.disabled = false;
          }
        };

// Manejar clic en el botón de pagar
payBtn.addEventListener('click', async function() {
  console.log(1);
  console.log(selectedDate);
  if (!selectedDate || !selectedPay || !selectedRef) {
    console.log(2);
    // Si no se ha seleccionado una fecha, mostrar mensaje de error
    const errorTextContainer = document.getElementById('error-text');

  const errorModal = document.getElementById('error-modal2');
  errorTextContainer.textContent = "Por favor, seleccione una fecha y agregue el monto y el numero de referencia del pago.";
  errorTextContainer.innerHTML = `
  <div class="flex justify-center items-center h-full">
  <div class="text-center flex flex-col justify-center items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-56 h-56">
          <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      <p class="text-red-700 text-sm font-serif mt-2">Por favor, seleccione una fecha y agregue el monto y el numero de referencia del pago.</p>
  </div>
  </div>
  `;

  errorModal.classList.remove('hidden');

  // Ocultar la notificación después de 0.3 segundos
  setTimeout(() => {
    errorTextContainer.style.display = 'none';
    errorModal.classList.add('hidden');
  }, 2000);

      return; // Detener la ejecución de la función
    }

    // Crear un objeto con los datos de la cita
    const citaData = {
      service: selectedService,
      date: selectedDate,
      pay: selectedPay,
      ref: selectedRef,
      totalPrice: totalPrice
    };

    console.log(citaData);
  
    
      // Enviar los datos de la cita al backend
    try {
      const citaResponse = await axios.post('/api/citas', citaData);
      console.log('Reserva guardada en la base de datos:', citaResponse.data);

      // Redirigir a la página de pago después de guardar la cita
      window.location.href = '/reservaciones/';

      // Mostrar notificación de éxito en el centro de la página
      const notificationElement = document.getElementById('notification');
      console.log(notificationElement);
      
      notificationElement.innerHTML = `
      <div class="fixed inset-0 flex justify-center items-center bg-stone-950 bg-opacity-50">
      <div class="flex flex-col items-center bg-stone-100 md:w-2/5 w-3/4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-56 h-56 p-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
        <p style="color: #10B981;" class="font-bold  p-4 rounded-lg z-50 text-center">Reserva agendada exitosamente.</p>
      </div>
      </div>
      `;
      document.body.appendChild(notificationElement);

      // Ocultar la notificación después de 0.3 segundos
      setTimeout(() => {
        notificationElement.style.display = 'none';
        notificationElement.remove(); // Elimina el elemento del DOM después de ocultarlo
      }, 3000);

      // Limpiar los servicios seleccionados, precio total y carrito
      selectedService = [];
      totalPrice = 0;
      totalPriceElement.textContent = 0;
      totalPriceCitasElement.textContent = 0;
      selectedDateElement.textContent = '';
      selectedPayElement.textContent = '';
      selectedRefElement.textContent = '';
      cartItemsContainer.innerHTML = '';
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // En caso de error, establece el mensaje de error en el contenedor y muéstralo
        const errorMessageContainer = document.getElementById('error-message');

        const errorModal = document.getElementById('error-modal');
        errorMessageContainer.textContent = error.response.data.error;
        errorMessageContainer.innerHTML = `
        <div class="flex justify-center items-center h-full">
        <div class="text-center flex flex-col justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-56 h-56">
              <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <p class="text-red-700 text-sm font-serif mt-2">${error.response.data.error}</p>
        </div>
        </div>
        `;
        errorModal.classList.remove('hidden');

        // Ocultar la notificación después de 0.3 segundos
        setTimeout(() => {
          errorMessageContainer.style.display = 'none';
          errorModal.classList.add('hidden');
        }, 2000); 

      } else {
        console.error('Error al guardar la reserva en la base de datos:', error);
      }
    }
});

// Manejar clic en el botón de pagar en el comercio
payOfficeBtn.addEventListener('click', async function() {

  if (!selectedDate) {
  // Si no se ha seleccionado una fecha, mostrar mensaje de error
  const errorTextContainer = document.getElementById('error-text');

  const errorModal = document.getElementById
  ('error-modal2');
  errorTextContainer.textContent = 'Por favor, seleccione una fecha para la reserva.';
  errorTextContainer.innerHTML = `
  <div class="flex justify-center items-center h-full">
  <div class="text-center flex flex-col justify-center items-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-56 h-56">
      <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
    <p class="text-red-700 text-sm font-serif mt-2">Por favor, seleccione una fecha.</p>
  </div>
  </div>
  `;

  errorModal.classList.remove('hidden');

  // Ocultar la notificación después de 0.3 segundos
  setTimeout(() => {
    errorTextContainer.style.display = 'none';
    errorModal.classList.add('hidden');
  }, 2000);

  return; // Detener la ejecución de la función
  }

// Crear un objeto con los datos de la cita
const citaData = {
  service: selectedService,
  date: selectedDate,
  totalPrice: totalPrice
};

// Enviar los datos de la cita al backend
try {
  const citaResponse = await axios.post('/api/citas', citaData);
  console.log('Reserva guardada en la base de datos:', citaResponse.data);

  // Redirigir a la página de pago después de guardar la cita
  window.location.href = '/reservaciones/';

  // Mostrar notificación de éxito en el centro
  const notificationElement = document.getElementById('notification');
  notificationElement.innerHTML = `
  <div class="fixed inset-0 flex justify-center items-center bg-stone-950 bg-opacity-50">
  <div class="flex flex-col items-center bg-stone-100 md:w-2/5 w-3/4">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-56 h-56 p-2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
    </svg>
    <p style="color: #10B981;" class="font-bold  p-4 rounded-lg z-50 text-center">
      Reserva agendada exitosamente. 
    </p>
  </div>
  </div>
  `;
  document.body.appendChild(notificationElement);
  
  // Ocultar la notificación después de 0.3 segundos
  setTimeout(() => {
    notificationElement.style.display = 'none';
    notificationElement.remove(); // Elimina el elemento del DOM después de ocultarlo
    }, 3000);

  // Limpiar los servicios seleccionados, precio total y carrito
  selectedService = [];
  totalPrice = 0;
  totalPriceElement.innerHTML = 0;
  totalPriceCitasElement.innerHTML = 0;
  selectedDateElement.innerHTML = '';
  cartItemsContainer.innerHTML = '';
} catch (error) {
  if (error.response && error.response.status === 400) {
    // En caso de error, establece el mensaje de error en el contenedor y muéstralo
    const errorMessageContainer = document.getElementById('error-message');

    const errorModal = document.getElementById('error-modal');
    errorMessageContainer.textContent = error.response.data.error;
    errorMessageContainer.innerHTML = `
    <div class="flex justify-center items-center h-full">
    <div class="text-center flex flex-col justify-center items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-56 h-56">
        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      <p class="text-red-700 text-sm font-serif mt-2">${error.response.data.error}</p>
  </div>
  </div>
    `;

    errorModal.classList.remove('hidden');
        
    // Ocultar la notificación después de 0.3 segundos
    setTimeout(() => {
      errorMessageContainer.style.display = 'none';
      errorModal.classList.add('hidden');
    }, 2000); 
  
  } else {
    console.error('Error al guardar la reserva en la base de datos:', error);
  }
}
});

  // Función para cargar el metodo de pago
  async function loadPaymentList(){
    const paymentList = document.getElementById('payment-list');
    const paymentListHtml = `
      <div class="md:w-full lg:max-w-md w-full md:pr-10 flex flex-col bg-white text-black relative border border-b p-4 border-blue-600 rounded-lg">
        <!-- contenido del div -->
        <h2 class="text-2xl font-bold mb-6">Pagar</h2>
        <h3 class="text-lg font-bold mb-4">Pago Movil</h3>
        <div id="dolar-bcv" class="text-lg font-semibold"></div>
        <div class="md:w-2/4 w-full md:pr-10 flex flex-col border border-b p-4 border-blue-600 mb-6">
          <p class="text-lg font-semibold">Mercantil</p>
          <p class="text-lg">04142109917</p>
          <p class="text-lg">V-27949934</p>
        </div>
        <div class="md:w-3/4 w-full md:pr-10 flex flex-col border border-b p-4 border-blue-600 rounded-lg">
          <label for="pay" class="font-bold text-lg">Monto: <span class="text-red-500">*</span></label>
          <input id="pay" type="text" class="w-full py-2 px-4 bg-white text-black border border-green-600 rounded">
          <p class="text-gray-700">Monto en bolivares.</p>
          <p class="text-gray-700">Si contiene decimales separelo por un punto(.)</p>
          <label for="ref" class="font-bold text-lg">Número de referencia: <span class="text-red-500">*</span></label>
          <input id="ref" type="text" class="w-full py-2 px-4 bg-white text-black border border-green-600 rounded">
          <p class="mb-2 text-gray-700">Últimos 4 digitos.</p>
          <button id="submit-button" disabled
            class="hover:bg-green-500 bg-green-600 text-white py-2 px-4 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Pagar</button>
        </div>
      </div>
    `;
    paymentList.innerHTML = paymentListHtml;
  }

    async function checkInputs() {
      const payInput = document.getElementById('pay');
      const refInput = document.getElementById('ref');
      const submitButton = document.getElementById('submit-button');

      selectedPay = payInput.value.trim();
      selectedRef = refInput.value.trim();

      if (selectedPay !== '' && selectedRef !== '') {
      submitButton.disabled = false;
      updateSelectedValues();
      } else {
        submitButton.disabled = true;
      }
    }

    async function updateSelectedValues() {
      console.log(`Selected pay: ${selectedPay}, Selected ref: ${selectedRef}`);
      // Aquí puedes agregar lógica adicional para manejar los cambios en los input
      // Por ejemplo, podrías llamar a una función para procesar el pago
      // processPayment(selectedPay, selectedRef);
    }
    
    async function init() {
      await loadPaymentList();
    
      const payInput = document.getElementById('pay');
      const refInput = document.getElementById('ref');
    
      payInput.addEventListener('input', checkInputs);
      refInput.addEventListener('input', checkInputs);
    }
    
    init();
  // paymentList.addEventListener()

  await loadPaymentList();


  // Crear un objeto de fecha
  let currentDate = new Date();

  // Obtener el nombre completo del mes (por ejemplo, "junio")
  let month = currentDate.toLocaleString('default', { month: 'long' });

  // Concatenar cadenas de año y mes y establecerlas como innerHTML
  document.getElementById("date").innerHTML = month + " " + currentDate.getFullYear();

  // Obtener referencias a los botones y al contenedor de fechas
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const carouselDates = document.querySelector('.carousel-dates');
  const selectedDateElement = document.getElementById('selected-date'); // Agregar referencia al elemento del carrito de fecha seleccionada

  // Función para cargar las fechas en el carrusel
  async function loadCarouselDates() {
    
    // Limpiar el contenido del carrusel
    carouselDates.innerHTML = '';

    // Calcular el número de fechas a mostrar según el tamaño de la pantalla
    const numberOfDatesToShow = window.innerWidth < 768 ? 5 : 6;

    // Agregar fechas al carrusel
    for (let i = 0; i < numberOfDatesToShow; i++) {
      const dateElement = document.createElement('div');
      dateElement.classList.add('p-2', 'flex', 'flex-col', 'items-center', 'justify-center', 'font-bold', 'rounded-full', 'text-white', 'md:mr-2'); // Agregar margen derecho

      // Crear un span para el número del día
      const dayNumberText = currentDate.getDate().toString().padStart(2, '0');
      dateElement.innerHTML = `
        <button class="font-bold rounded-full text-sm md:text-2xl bg-blue-600 hover:bg-blue-400 hover:border hover:border-b hover:border-black transition ease-in-out p-4 mb-1 md:w-16 md:h-16 h-10 w-10 flex items-center justify-center">
          <span class="sr-only">${dayNumberText}</span>
          ${dayNumberText}
        </button>
      `;

      // Capturar el valor de la fecha actual en el momento del clic
      const dateValue = new Date(currentDate);

      dateElement.addEventListener('click', async function() {
        const selectedDateText = dateValue.toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric' });
        console.log('Fecha seleccionada:', selectedDateText);

        // Mostrar la fecha seleccionada en el carrito
        selectedDateElement.textContent = selectedDateText;
        // Agregar aquí la lógica para utilizar la fecha seleccionada
        selectedDate = selectedDateText 

      });

      // Agregar el día de la semana al elemento de fecha
      const dayOfWeek = document.createElement('span');
      dayOfWeek.textContent = currentDate.toLocaleDateString('es-Es', { weekday: 'short' }); // Obtener el día de la semana
      dayOfWeek.classList.add('md:text-xl'); // Estilo adicional para el tamaño del texto
      dateElement.appendChild(dayOfWeek);

      carouselDates.appendChild(dateElement);

      // Avanzar al siguiente día
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }   

  // Manejar el evento de clic en el botón "Anterior"
  prevBtn.addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() - 0); // Retroceder una semana
    loadCarouselDates();
  });

  // Manejar el evento de clic en el botón "Siguiente"
  nextBtn.addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() + 0); // Avanzar una semana
    loadCarouselDates();
  });
  
  // Mostrar las fechas iniciales
  loadCarouselDates();
  
  } catch (error) {
    console.error('Error al obtener los servicios:', error);
  }
});