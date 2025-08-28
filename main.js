const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.querySelector('html');
const icon = themeToggle.querySelector('i');

// Función para cambiar el tema
const setTheme = (theme) => {
    if (theme === 'dark') {
        htmlElement.classList.add('dark');
        icon.classList.remove('bxs-moon');
        icon.classList.add('bxs-sun');
    } else {
        htmlElement.classList.remove('dark');
        icon.classList.remove('bxs-sun');
        icon.classList.add('bxs-moon');
    }
    localStorage.setItem('theme', theme);
};

// Cargar el tema guardado al iniciar
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(savedTheme);

// Event listener para el botón
themeToggle.addEventListener('click', () => {
    // Si el HTML tiene la clase 'dark', se la quitamos; de lo contrario, se la agregamos.
    if (htmlElement.classList.contains('dark')) {
        setTheme('light');
    } else {
        setTheme('dark');
    }
});

//initialing SWIPER
const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,


    // If we need pagination
    pagination: {
        el: '.swiper-pagination',

    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    //   draggable:'false'
    // },
});

// !logica de captura de datos en pantalla usando swiper-js

const userResponses = {};

// Escuchar el evento de cambio de diapositiva
swiper.on('slideChange', () => {
    // Obtener el índice de la diapositiva que el usuario acaba de dejar
    const previousSlideIndex = swiper.previousIndex;

    // Usar un switch para manejar la captura de datos de cada formulario
    switch (previousSlideIndex) {
        // Suponiendo que el formulario de transporte está en la diapositiva con índice 1
        case 1:
            const transportType = document.getElementById('transport-type').value;
            const kmTraveled = document.getElementById('km-traveled').value;

            userResponses.transporte = {
                tipo: transportType,
                km: kmTraveled
            };
            console.log("Datos de transporte capturados:", userResponses.transporte);
            break;

        // Suponiendo que el formulario de electricidad está en la diapositiva con índice 2
        case 2:
            const kilowattsHome = document.getElementById('kilowatts-home').value;
            const kilowattsOffice = document.getElementById('kilowatts-office').value;

            userResponses.electricidad = {
                hogar: kilowattsHome,
                trabajo: kilowattsOffice
            };
            console.log("Datos de electricidad capturados:", userResponses.electricidad);
            break;

        // Puedes seguir agregando más casos para cada formulario

        default:
            // No hacer nada si el slide no tiene un formulario asociado
            break;
    }
});