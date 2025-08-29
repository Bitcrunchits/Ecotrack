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

//!initialing SWIPER
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

// Función universal para validar y capturar datos del formulario actual
function handleForm() {
    const currentSlide = swiper.slides[swiper.realIndex];
    const currentForm = currentSlide.querySelector('form');
    const nextButton = document.querySelector('.swiper-button-next');

    // Deshabilita el botón de siguiente por defecto
    nextButton.classList.add('swiper-button-disabled');

    if (!currentForm) {
        // No hay formulario en este slide, habilita el botón de siguiente
        nextButton.classList.remove('swiper-button-disabled');
        return;
    }

    const requiredInputs = currentForm.querySelectorAll('[required]');

    // Función para verificar la validez del formulario
    const checkValidity = () => {
        let isFormValid = true;
        requiredInputs.forEach(input => {
            if (!input.value) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            nextButton.classList.remove('swiper-button-disabled');
        } else {
            nextButton.classList.add('swiper-button-disabled');
        }
    };

    // Escucha cambios en los inputs para validar el formulario
    currentForm.addEventListener('input', checkValidity);

    // Llama a la función de validación una vez al cargar el slide
    checkValidity();
}

// Escuchar el evento de cambio de diapositiva
swiper.on('slideChange', () => {
    // Captura los datos del formulario que se acaba de dejar
    const previousSlideIndex = swiper.previousIndex;

    switch (previousSlideIndex) {
        case 1:
            const transportType = document.getElementById('transport-type');
            const kmTraveled = document.getElementById('km-traveled');
            if (transportType && kmTraveled) {
                userResponses.transporte = {
                    tipo: transportType.value,
                    km: kmTraveled.value
                };
                console.log("Datos de transporte capturados:", userResponses.transporte);
            }
            break;

        case 2:
            const kilowattsHome = document.getElementById('kilowatts-home');
            const gasM3 = document.getElementById('gas-m3');
            const woodKg = document.getElementById('wood-kg');
            if (kilowattsHome && gasM3) {
                userResponses.energia = {
                    electricidad: kilowattsHome.value,
                    gas: gasM3.value,
                    lena: woodKg ? woodKg.value : ''
                };
                console.log("Datos de energía capturados:", userResponses.energia);
            }
            break;
    }
    
    // Ejecuta el manejo del formulario para la nueva diapositiva
    handleForm();
});

// Llama a la función al cargar la página para la primera diapositiva
document.addEventListener('DOMContentLoaded', () => {
    handleForm();
});