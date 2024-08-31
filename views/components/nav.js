const navbar = document.querySelector('#navbar');

const createNavsignup = () => {
  navbar.innerHTML = `
    <div class="max-w-7xl bg-green-600 h-16 mx-auto flex items-center px-4 justify-between">
      <p class="font-bold text-xl text-white">Travel</p> 

      <!--Version movil-->
      <svg
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-10 h-10 md:hidden text-white cursor-pointer p-2 hover:bg-green-700 rounded-lg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>

      <!--Version de escritorio-->
      <div class="hidden md:flex flex-row gap-4">
        <a href="/login/" class="transition ease-in-out text-white font-bold hover:bg-green-700 py-2 px-4 rounded-lg">Login</a>
      </div>

      <!--Menu movil-->
      <div class="bg-green-500/60 fixed top-16 right-0 left-0 bottom-0  justify-center items-center flex-col gap-4 hidden">
        <a href="/login/" class="transition ease-in-out text-black font-bold hover:bg-green-700 py-2 px-4 rounded-lg">Login</a>
      </div>
    </div>
  `;
};

const createNavLogin = () => {
  navbar.innerHTML = `
    <div class="max-w-7xl bg-green-600 h-16 mx-auto flex items-center px-4 justify-between">
      <p class="font-bold text-xl text-white">Travel</p> 

      <!--Version movil-->
      <svg
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-10 h-10 md:hidden text-white cursor-pointer p-2 hover:bg-green-700 rounded-lg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>

      <!--Version de escritorio-->
      <div class="hidden md:flex flex-row gap-4">
        <a href="/signup/" class="transition ease-in-out text-white font-bold hover:bg-green-700 py-2 px-4 rounded-lg">Registro</a>
      </div>

      <!--Menu movil-->
      <div class="bg-green-500/60  fixed top-16 right-0 left-0 bottom-0  justify-center items-center flex-col gap-4 hidden">
        <a href="/signup/" class="transition ease-in-out text-black font-bold hover:bg-green-700 py-2 px-4 rounded-lg">Registro</a>
      </div>
    </div>
  `;
};

const createNavTodos = () => {
  navbar.innerHTML = `
    <div class="max-w-7xl bg-green-600 h-16 mx-auto flex items-center px-4 justify-between">
      <p class="font-bold text-xl text-white">Travel</p> 

      <!--Version movil-->
      <svg
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-10 h-10 md:hidden text-white cursor-pointer p-2 hover:bg-green-700 rounded-lg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>

      <!--Version de escritorio-->
      <div class="hidden md:flex flex-row gap-4">
        <button id="close-btn" class="transition ease-in-out text-white font-bold hover:bg-green-700 py-2 px-4 rounded-lg">Cerrar sesión</button>
        <a href="/reservaciones/" class="transition ease-in-out text-black font-bold hover:bg-green-700 py-2 px-4 rounded-lg">Reservaciones</a>
      </div>

      <!--Menu movil-->
      <div class="bg-green-500/60 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden" style="z-index: 1000">
        <button id="close-btn" class="transition ease-in-out text-white font-bold hover:bg-green-700 py-2 px-4 rounded-lg">Cerrar sesión</button>
        <a href="/reservaciones/" class="transition ease-in-out text-black font-bold hover:bg-green-700 py-2 px-4 rounded-lg">Reservaciones</a>
      </div>
    </div>
  `;
};
// Al anterior se le agrego style="z-index: 1000" para que el navegador estuviera sobre los elementos de mi html, de lo contrario estaria detras, solo lo aplique para esto.

const createNavAdmin = () => {
  navbar.innerHTML = `
    <div class="max-w-7xl bg-green-600 h-16 mx-auto flex items-center px-4 justify-between">
      <p class="font-bold text-xl text-white">Travel</p> 

      <!--Version movil-->
      <svg
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-10 h-10 md:hidden text-white cursor-pointer p-2 hover:bg-green-700 rounded-lg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>

      <!--Version de escritorio-->
      <div class="hidden md:flex flex-row gap-4">
        <button id="close-btn" class="transition ease-in-out text-white font-bold hover:bg-green-700 py-2 px-4 rounded-lg">Cerrar sesión</button>
      </div>

      <!--Menu movil-->
      <div class="bg-green-500/60  fixed top-16 right-0 left-0 bottom-0  justify-center items-center flex-col gap-4 hidden" style="z-index: 1000">
        <button id="close-btn" class="transition ease-in-out text-white font-bold hover:bg-green-700 py-2 px-4 rounded-lg">Cerrar sesión</button>
      </div>
    </div>
  `;
};

const createNavPago = () => {
  navbar.innerHTML = `
    <div class="max-w-7xl bg-green-600 h-16 mx-auto flex items-center px-4 justify-between">
      <p class="font-bold text-xl text-white">Travel</p> 

      <!--Version movil-->
      <svg
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-10 h-10 md:hidden text-white cursor-pointer p-2 hover:bg-green-700 rounded-lg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>

      <!--Version de escritorio-->
      <div class="hidden md:flex flex-row gap-4">
        <button id="close-btn" class="transition ease-in-out text-white font-bold hover:bg-green-700 py-2 px-4 rounded-lg">Cerrar sesión</button>
      </div>

      <!--Menu movil-->
      <div class="bg-green-500/60  fixed top-16 right-0 left-0 bottom-0  justify-center items-center flex-col gap-4 hidden">
        <button id="close-btn" class="transition ease-in-out text-white font-bold hover:bg-green-700 py-2 px-4 rounded-lg">Cerrar sesión</button>
      </div>
    </div>
  `;
};

const createNavReservaciones = () => {
  navbar.innerHTML = `
    <div class="max-w-7xl bg-green-600 h-16 mx-auto flex items-center px-4 justify-between">
      <p class="font-bold text-xl text-white">Travel</p> 

      <!--Version movil-->
      <svg
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-10 h-10 md:hidden text-white cursor-pointer p-2 hover:bg-green-700 rounded-lg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>

      <!--Version de escritorio-->
      <div class="hidden md:flex flex-row gap-4">
        <button id="close-btn" class="transition ease-in-out text-white font-bold hover:bg-green-700 py-2 px-4 rounded-lg">Cerrar sesión</button>
        <a href="/todos/" class="transition ease-in-out text-black font-bold hover:bg-green-700 py-2 px-4 rounded-lg">Home</a>
      </div>

      <!--Menu movil-->
      <div class="bg-green-500/60  fixed top-16 right-0 left-0 bottom-0  justify-center items-center flex-col gap-4 hidden" style="z-index: 1000">
        <button id="close-btn" class="transition ease-in-out text-white font-bold hover:bg-green-700 py-2 px-4 rounded-lg">Cerrar sesión</button>
        <a href="/todos/" class="transition ease-in-out text-black font-bold hover:bg-green-700 py-2 px-4 rounded-lg">Home</a>
      </div>
    </div>
  `;
};

if (window.location.pathname === '/') {
  createNavHome();
} else if (window.location.pathname === '/signup/'){
  createNavsignup();
} else if (window.location.pathname === '/login/'){
  createNavLogin();
} else if (window.location.pathname === '/todos/'){
  createNavTodos();
} else if (window.location.pathname === '/admin/'){
  createNavAdmin();
} else if (window.location.pathname === '/pago/'){
  createNavPago();
} else if (window.location.pathname === '/reservaciones/'){
  createNavReservaciones();
}

const navBtn = navbar.children[0].children[1];

navBtn.addEventListener('click', e => {
  const menuMobile = navbar.children[0].children[3];
  if (!navBtn.classList.contains('active')) {
    navBtn.classList.add('active');
    navBtn.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />';
    menuMobile.classList.remove('hidden');
    menuMobile.classList.add('flex');
  } else {
    navBtn.classList.remove('active');
    navBtn.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>'
    menuMobile.classList.add('hidden');
    menuMobile.classList.remove('flex');
  }
});

// Esta variable te ayudará a controlar si el usuario ya cerró la sesión
let loggedOut = false;

// Agregar evento beforeunload para detectar cuando el usuario intenta salir de la página
window.addEventListener('beforeunload', function (e) {
  // Si el usuario no ha cerrado la sesión, mostrar el mensaje de advertencia
  if (!loggedOut) {
      const confirmationMessage = '¿Seguro que quieres salir? Se cerrará la sesión.';
      (e || window.event).returnValue = confirmationMessage; // Para navegadores más antiguos
      return confirmationMessage;
  }
});

const closeBtnDesktop = navbar.children[0].children[2].children[0];
const closeBtnMobile = navbar.children[0].children[3].children[0];

closeBtnDesktop.addEventListener('click', async e =>{
  try {
    await axios.get('/api/logout');
    loggedOut = true; // Marcamos que el usuario ha cerrado la sesión
    window.location.replace('/login');
  } catch (error) {
    console.log(error);
  }
});

closeBtnMobile.addEventListener('click', async e =>{
  try {
    await axios.get('/api/logout');
    loggedOut = true; // Marcamos que el usuario ha cerrado la sesión
    window.location.replace('/login');
  } catch (error) {
    console.log(error);
  }
});