
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


themeToggle.addEventListener('click', () => {
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

});


//!Logica de captura de datos en pantalla usando swiper-js

const userResponses = {};

// Referencias a los botones de navegación
const nextButton = document.querySelector('.swiper-button-next');
const prevButton = document.querySelector('.swiper-button-prev');
const calculateButton = document.getElementById('calculate-button');


// Función universal para validar y manejar el estado del formulario actual
function handleForm() {
    const currentSlide = swiper.slides[swiper.realIndex];
    const currentForm = currentSlide.querySelector('form');

    // Maneja la visibilidad de los botones de navegación y del botón de cálculo
    if (swiper.realIndex === swiper.slides.length - 1) {
        nextButton.style.display = 'none';
        prevButton.style.display = 'none';
        if (calculateButton) {
            calculateButton.style.display = 'block';
        }
    } else {
        nextButton.style.display = 'block';
        prevButton.style.display = 'block';
        if (calculateButton) {
            calculateButton.style.display = 'none';
        }
    }

    if (!currentForm) {
        nextButton.classList.remove('swiper-button-disabled');
        return;
    }

    // Deshabilita el botón de siguiente por defecto
    nextButton.classList.add('swiper-button-disabled');
    const requiredInputs = currentForm.querySelectorAll('[required]');

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
    currentForm.addEventListener('input', checkValidity);
    checkValidity();
}

// Escuchar el evento de cambio de diapositiva
swiper.on('slideChange', () => {
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
    handleForm();
});

// Función para manejar el botón de cálculo
const handleCalculateButton = () => {
    console.log("Datos finales listos para el cálculo:", userResponses);
    alert("¡Datos listos para el cálculo! Revisa la consola para ver las respuestas capturadas.");
    // Aquí es donde iría la lógica para calcular y mostrar la huella de carbono.
};

// Asignar el evento al botón de cálculo
if (calculateButton) {
    calculateButton.addEventListener('click', handleCalculateButton);
}

// Llama a la función al cargar la página para la primera diapositiva
document.addEventListener('DOMContentLoaded', () => {
    handleForm();
});