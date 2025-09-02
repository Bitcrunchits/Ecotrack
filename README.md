# ECOTRACK
## Introducción 
## Descripcion de la APP
La huella de carbono es un indicador ambiental que mide la cantidad total de gases de efecto invernadero (GEI) emitidos de forma directa o indirecta por **actividades humanas:**
1. Consumo de energía.
1. Transporte.
1. Producción y consumo de bienes y servicios. 

Se expresa en toneladas de CO₂ equivalente y cuantifica el impacto de una persona, hogar, empresa, producto o país en el cambio climático. 

## Nuestra App
<img src="./assets/ecotrack1.jpg" alt="Captura de pantalla de la app" width="30%" >

ECOTRACK es una App adaptable a las pantallas de diferentes dispositivos que esta diseñada para calcular la huella de carbono personal anual (o la de tu hogar). Esto quiere decir la cantidad de Kg de CO₂ (equivalente) que produduce tu actividad o la de tu hogar a lo largo de un año. También brinda información aproximada de cuantos arboles son necesarios plantar para compensar la contaminación producida CO₂.

## Calcula la cantidad de CO₂ que liberan en tus actividades en un año

### Pantallas de ingreso de datos

En la pantalla **Transporte** debes:

<img src="./assets/ecotrack3.jpg" alt="Captura de pantalla de la app" width="50%">

**1. Seleccionar tu medio de transporte habitual.**

**2. Ingresar los kilometros mensuales aproximados que recorres.**



En la pantalla **Consumo de energía** debes:

<img src="./assets/ecotrack5.jpg" alt="Captura de pantalla de la app" width="50%">

**1. Ingresar el número de kWh que consumes por mes en el campo Kilowatts en el hogar.** 

#### ¿Como obtienes este dato?
Recuerda que en Argentina los datos de consumo en kWh son bimestrales. De manera que si en tu boleta figura por ejemplo: 400 kWh debes dividir por 2.

* 400 kWh/2 = 200 kWh

Otra cosa a tener en cuenta es que si en tu hogar viven 4 personas, los 200 kWh de consumo mensual deben dividirse por 4.

* 200 kWh/4 = 50 kWh
Por lo que tu consumo mensual es de 50 kWh.

**2. Ingresar el número de m³ de gas que consumes por mes en el campo Gas en casa.**
#### ¿Como obtienes este dato?
Recuerda que en Argentina los datos de **m³** de gas se muestran como 6 grupos bimestrales de consumo. De manera que si en tu boleta figura: 

<img src="./assets/m³ de gas consumido por bimestre.png" alt="Captura gas anual" width="60%"> 

Segun esta boleta debes sumar 934 m³+ 222 m³ + 110 m³ + 144 m³ + 553 m³ + 1349 m³ y dividirlo en 12 meses.
* (934 m³ + 222 m³ + 110 m³ + 144 m³ + 553 m³ + 1349 m³)/12 = 276 m³ mensuales en el hogar. 
Pero si en tu hogar viven 4 personas seria 276 m³ dividido 4:
* 276 m³/4 = **69 m³ mensuales por persona.**

**3. Ingresar el número de Kg de consumo de leña (opcional).**

Un calculo aproximado seria: Si una familia de 4 personas come un asado por mes, consume  8 Kg de leña o carbón para hacer el fuego, de manera que debes ingresar 2 kg de leña por mes.

En la pantalla **Alimentación** debes:

<img src="./assets/ecotrack7.jpg" alt="Captura de pantalla de la app" width="50%">


**1. Ingresar el número de Kg de carne consumida en el mes.** 

Al igual que en los ejemplos anteriores, si tu hogar esta compuesto de 4 personas debes dividir los Kg totales mensuales de carne consumida por cuatro. Por ejemplo, si se consumen 40 kg mensuales en tu hogar, deberas ingresar 10 kg de carne.

**2. Ingresar el número de **Kg** de verdura consumida en el mes.**

 Como en el ejemplo anterior, si tu hogar esta compuesto de 4 personas debes dividir los Kg totales mensuales de verdura consumida por cuatro. Por ejemplo, si se consumen 60 kg mensuales en tu hogar, deberas ingresar 15 kg de carne.

Pantalla de **Resultados**:
**<div><span style="color: red;">En Construcción </span></div>**

## Tecnologías y Librerías 💻
* **HTML5, CSS3 y JavaScript (Vanilla JS):** El corazón del proyecto, usado para la estructura, el estilo y la lógica principal.
* **Tailwind CSS:** Framework CSS utility-first para un desarrollo de diseño rápido y responsivo.
* **Swiper.js:** Librería de carrusel utilizada para crear la interfaz de usuario de múltiples pasos, lo que mejora la experiencia del usuario.
* **Boxicons:** Librería de íconos que añade elementos visuales a la interfaz, como el botón de modo oscuro.
## Documentación de Referencia:
* [Swiper.js Docs](https://swiperjs.com/get-started)
* [Tailwind CSS Docs](https://tailwindcss.com/docs)
* [Boxicons Docs](https://boxicons.com/)


## Instalación y Ejecución ▶️

Este proyecto es una aplicación web estática, por lo que su instalación y ejecución son muy sencillas.
1. Clonar el repositorio.

    Bash:
    git clone https://github.com/Bitcrunchits/Ecotrack.git

1. Navegar al directorio del proyecto.

    Bash:
    cd ecotrack


1. Abrir el archivo: Simplemente abre el archivo index.html en tu navegador web preferido. No se necesita ningún servidor local, ya que todo el procesamiento se realiza en el navegador con JavaScript.


## Fragmentos de Código Clave 🧩

### Función para cambiar el tema DARK/LIGTH de tailwind CSS
``` javascript
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
```
### Factores de Conversión
Esta sección define los factores de emisión de CO₂​ para cada categoría. El código utiliza estos valores para calcular la huella de carbono a partir de los datos ingresados por el usuario. Se trata variables de estado que en un version superior 
se podría modificar desde front.
```javascript
const FACTORES_CO2_ANUAL = {
    TRANSPORTE_KM_POR_MES: 0.12,  // kg de CO2 por km recorrido en vehículo
    ELECTRICIDAD_KWH: 0.285,      // kg de CO2 por kWh
    GAS_M3: 2.1,                  // kg de CO2 por m3 de gas
    CARNE_KG: 27,                 // kg de CO2 por kg de carne
    VEGETALES_KG: 2,              // kg de CO2 por kg de vegetales
    LENA_KG: 1.25,                // kg de CO2 por kg de leña
};
```
### Lógica de Cálculo
La función **handleCalculateButton** toma los datos mensuales del usuario y los multiplica por 12 para obtener un valor anual. Luego, usa los factores de conversión para calcular la huella de carbono total.

```javascript
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


    // 4. Calcular los árboles necesarios
    const arboles = Math.ceil((huellaTotal / 1000) * ARBOLES_POR_TONELADA_CO2);
```
### Captura y almacenamiento de información de un usuario (swiper).
Este código actúa como un sistema de seguimiento de un formulario multipaso, recolectando y guardando de manera organizada la información que el usuario ingresa en cada etapa antes de pasar a la siguiente diapositiva utilizando la estructura de control switch case.

```javascript
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
```

## Licencia 📜
<small>Este software está bajo la licencia MIT. Esto significa que puedes usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar y/o vender copias del software. La única condición es que se debe incluir el aviso de copyright y la licencia en todas las copias o partes sustanciales del software.
 © 2025 ITS Cipolletti. Todos los derechos reservados.</small>
