



const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.querySelector('html');


// Función para cambiar el tema
const setTheme = (theme) => {
    htmlElement.classList.remove('light', 'dark');
    htmlElement.classList.add(theme);
    if (theme === 'dark') {
        themeToggle.innerHTML = "<i class='bx bxs-sun'></i>";
    } else {
        themeToggle.innerHTML = "<i class='bx bxs-moon'></i>";
    }
    localStorage.setItem('theme', theme);
};

// Cargar el tema guardado en localStorage al iniciar
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(savedTheme);

// Event listener para el botón
themeToggle.addEventListener('click', () => {
    if (htmlElement.classList.contains('light')) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
});