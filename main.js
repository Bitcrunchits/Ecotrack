const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.querySelector('html');
const icon = themeToggle.querySelector('i');

// Función para cambiar el tema DARK/LIGTH de tailw
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

//iniciar SWIPER
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
//swiper.slideTo(swiper.slides.length - 1, 0); //* esto lo hice para stilar la ultima pantalla y cada vez que refresque queria verla directamente

//!Logica de CAPTURA DE DATOS en pantalla usando swiper-js

const userResponses = {};

// Referencias a los botones de navegación
const nextButton = document.querySelector('.swiper-button-next');
const prevButton = document.querySelector('.swiper-button-prev');
const calculateButton = document.getElementById('calculate-button');
const backButton = document.getElementById('back-button');

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
        case 0:
    const numIntegrantesInput = document.getElementById('num-integrantes');
    if (numIntegrantesInput) {
        userResponses.familia = {
            integrantes: parseInt(numIntegrantesInput.value)
        };
        console.log("Número de integrantes capturado:", userResponses.familia.integrantes);
    }
    break;

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


        case 3:
            const carneConsumida = document.getElementById('carne-consumida');
            const vegetalesConsumidos = document.getElementById('vegetales-consumidos');
            if (carneConsumida && vegetalesConsumidos) {
                userResponses.alimentacion = {
                    carne: carneConsumida.value,
                    vegetales: vegetalesConsumidos.value,
                };
                console.log("Datos de energía capturados:", userResponses.alimentacion);
            }
            break;
    }
    handleForm();
});

// Constantes de ESTADO "factores de conversión"
const FACTORES_CO2_ANUAL = {
    TRANSPORTE_KM_POR_MES: 0.24,  // kg de CO2 por km recorrido en vehículo promedio
    ELECTRICIDAD_KWH: 0.285,      // kg de CO2 por kWh en Argentina
    GAS_M3: 1.8,                  // kg de CO2 por m3 de gas en Argentina
    CARNE_KG: 14,                 // kg de CO2 por kg de carne
    VEGETALES_KG: 0.450,              // kg de CO2 por kg de vegetales
    LENA_KG: 1.25,                // kg de CO2 por kg de leña
};
// Factor de compensación en árboles
const ARBOLES_POR_TONELADA_CO2 = 5; // Un árbol promedio compensa 200 kg de CO2 al año

//! LOGICA DE CALCULO

// Función para manejar el botón de cálculo
const handleCalculateButton = () => {
    // 1. Obtener los datos capturados
    const datosTransporte = userResponses.transporte;
    const datosEnergia = userResponses.energia;
    const datosAlimentacion = userResponses.alimentacion;


    // 2. Calcular la huella de carbono de cada sección
    const huellaTransporte = datosTransporte
        ? (datosTransporte.tipo === 'vehicle' ? datosTransporte.km * FACTORES_CO2_ANUAL.TRANSPORTE_KM_POR_MES * 12 : 0)
        : 0;


    const huellaHogar = datosEnergia
        ? (datosEnergia.electricidad * FACTORES_CO2_ANUAL.ELECTRICIDAD_KWH * 12) +
        (datosEnergia.gas * FACTORES_CO2_ANUAL.GAS_M3 * 12) +
        (datosEnergia.lena * FACTORES_CO2_ANUAL.LENA_KG * 12)
        : 0;


    const huellaAlimentacion = datosAlimentacion
        ? (datosAlimentacion.carne * FACTORES_CO2_ANUAL.CARNE_KG * 12) +
        (datosAlimentacion.vegetales * FACTORES_CO2_ANUAL.VEGETALES_KG * 12)
        : 0;


    // 3. Sumar para obtener la huella total
    const huellaTotal = huellaTransporte + huellaHogar + huellaAlimentacion;
    console.log(huellaTotal)
    const integrantes = userResponses.familia?.integrantes || 1;
    const huellapersonal = huellaTotal / integrantes;


    // 4. Calcular los árboles necesarios
    const arboles = Math.ceil((huellaTotal / 1000) * ARBOLES_POR_TONELADA_CO2);


    // 5. Mostrar los resultados en la interfaz
    document.getElementById('huella-transporte').textContent = `${huellaTransporte.toFixed(2)} kg CO₂`;
    document.getElementById('huella-hogar').textContent = `${huellaHogar.toFixed(2)} kg CO₂`;
    document.getElementById('huella-alimentacion').textContent = `${huellaAlimentacion.toFixed(2)} kg CO₂`;
    document.getElementById('huella-total').textContent = `${huellaTotal.toFixed(2)} kg CO₂`;
    document.getElementById('huella-personal').textContent = `${huellapersonal} kg CO₂`;
    document.getElementById('arboles-compensacion').textContent = `${arboles} árboles`;

    // Opcional: Desplazarse al slide de resultados
    swiper.slideTo(swiper.slides.length - 1);
};

// Asignar el evento al botón de cálculo y volver a inicio
if (calculateButton) {
    calculateButton.addEventListener('click', handleCalculateButton);
};

//*funcion para resetear los datos al presionar boton de volver
const handleBackButton = () => {
    const formTransporte = document.getElementById('gasolina');
    const formEnergia = document.getElementById('electric');
    const formAlimentos = document.getElementById('alimentacion');
    const formintegrantes=document.getElementById('familia-form')

    if (formTransporte) formTransporte.reset();
    if (formEnergia) formEnergia.reset();
    if (formAlimentos) formAlimentos.reset();
     if(formintegrantes) formintegrantes.reset();

    swiper.slideTo(0); //Hace volver a pantalla 2
};

if (backButton) {
    backButton.addEventListener('click', handleBackButton)
};

// Llama a la función al cargar la página para la primera diapositiva
document.addEventListener('DOMContentLoaded', () => {
    handleForm();
});
