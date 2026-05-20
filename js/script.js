document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;

    // Verificar si el usuario ya eligió un tema antes y lo guardó
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        // Aplicar el tema guardado
        htmlElement.setAttribute('data-bs-theme', savedTheme);
        toggleBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    } else {
        // Si es la primera vez, chequear qué prefiere su sistema operativo
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if(prefersDark) {
            htmlElement.setAttribute('data-bs-theme', 'dark');
            toggleBtn.textContent = '☀️';
        }
    }

    // Lógica al hacer clic en el botón
    toggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-bs-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Aplicar el nuevo tema
        htmlElement.setAttribute('data-bs-theme', newTheme);
        // Guardarlo en el navegador para que no se borre al cambiar de ventana
        localStorage.setItem('theme', newTheme);
        
        // Cambiar el icono del botón
        toggleBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
});
