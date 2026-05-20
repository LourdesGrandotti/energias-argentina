// Inicializar el mapa centrado en Argentina
const map = L.map('map').setView([-38.4161, -63.6167], 4);

// Añadir capa de OpenStreetMap
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

// Datos de las ubicaciones
const locations = [
    // SOLAR
    { name: "Parque Solar Cauchari", type: "Solar", icon: "☀️", lat: -23.95, lng: -66.75, province: "Jujuy", company: "JEMSE, PowerChina, Shanghai Electric" },
    { name: "Parque Solar San Juan", type: "Solar", icon: "☀️", lat: -31.43, lng: -68.7, province: "San Juan", company: "EPSE" },
    { name: "Parque Solar Nonogasta", type: "Solar", icon: "☀️", lat: -29.28, lng: -67.5, province: "La Rioja", company: "360Energy" },
    { name: "Parque Solar Zonda", type: "Solar", icon: "☀️", lat: -31.54, lng: -68.52, province: "San Juan", company: "YPF Luz" },
    
    // EÓLICA
    { name: "Parque Eólico Rawson", type: "Eólica", icon: "💨", lat: -43.32, lng: -65.12, province: "Chubut", company: "Genneia" },
    { name: "Parque Eólico Los Teros", type: "Eólica", icon: "💨", lat: -36.85, lng: -59.9, province: "Buenos Aires", company: "YPF Luz" },
    { name: "Parque Eólico Madryn", type: "Eólica", icon: "💨", lat: -42.75, lng: -65.05, province: "Chubut", company: "Genneia" },
    { name: "Parque Eólico Manantiales Behr", type: "Eólica", icon: "💨", lat: -45.72, lng: -67.81, province: "Chubut", company: "YPF Luz" },

    // HIDROELÉCTRICA
    { name: "Represa Yacyretá", type: "Hidroeléctrica", icon: "💧", lat: -27.48, lng: -56.73, province: "Corrientes", company: "EBY" },
    { name: "Represa Salto Grande", type: "Hidroeléctrica", icon: "💧", lat: -31.27, lng: -57.94, province: "Entre Ríos", company: "CTM" },
    { name: "Complejo El Chocón", type: "Hidroeléctrica", icon: "💧", lat: -39.27, lng: -68.78, province: "Neuquén / Río Negro", company: "Enel" },
    { name: "Represa Piedra del Águila", type: "Hidroeléctrica", icon: "💧", lat: -40.02, lng: -70.07, province: "Neuquén", company: "Central Puerto S.A." },

    // FÓSIL
    { name: "Vaca Muerta", type: "Fósil", icon: "🛢️", lat: -38.25, lng: -68.91, province: "Neuquén", company: "YPF, Tecpetrol, Shell, PAE, etc." },
    { name: "Cuenca Golfo San Jorge", type: "Fósil", icon: "🛢️", lat: -46.0, lng: -68.0, province: "Chubut / Santa Cruz", company: "YPF, PAE, CAPSA" },
    { name: "Cuenca Austral", type: "Fósil", icon: "🛢️", lat: -53.5, lng: -68.5, province: "Tierra del Fuego", company: "TotalEnergies, CGC, YPF" },
    { name: "Cuenca Cuyana", type: "Fósil", icon: "🛢️", lat: -33.05, lng: -68.85, province: "Mendoza", company: "YPF, Pluspetrol" },

    // NUCLEAR
    { name: "Complejo Nuclear Atucha (I, II y CAREM)", type: "Nuclear", icon: "☢️", lat: -33.96, lng: -59.2, province: "Buenos Aires", company: "NASA / CNEA" },
    { name: "Central Nuclear Embalse", type: "Nuclear", icon: "☢️", lat: -32.23, lng: -64.44, province: "Córdoba", company: "NASA" },

    // BIOGÁS
    { name: "Planta Bioeléctrica", type: "Biogás", icon: "🌱", lat: -33.12, lng: -64.35, province: "Córdoba", company: "Bioeléctrica" },
    { name: "Planta Yanquetruz", type: "Biogás", icon: "🌱", lat: -33.35, lng: -65.71, province: "San Luis", company: "ACA" },
    { name: "Pacuca", type: "Biogás", icon: "🌱", lat: -35.41, lng: -59.32, province: "Buenos Aires", company: "Grupo Caleu Caleu" },
    { name: "Planta San Pedro", type: "Biogás", icon: "🌱", lat: -33.68, lng: -59.66, province: "Buenos Aires", company: "Grupo Arcor" },

    // BIOMASA
    { name: "Planta Prodeman", type: "Biomasa", icon: "🪵", lat: -32.81, lng: -63.87, province: "Córdoba", company: "Prodeman" },
    { name: "Ingenio Ledesma", type: "Biomasa", icon: "🪵", lat: -23.82, lng: -64.79, province: "Jujuy", company: "Ledesma S.A.A.I." },

    // TÉRMICA
    { name: "Central Costanera", type: "Térmica", icon: "🔥", lat: -34.62, lng: -58.34, province: "CABA", company: "Central Puerto S.A." },
    { name: "Central Vuelta de Obligado", type: "Térmica", icon: "🔥", lat: -32.65, lng: -60.81, province: "Santa Fe", company: "Central Vuelta de Obligado S.A." }
];

// Función para crear iconos personalizados con emojis
const createEmojiIcon = (emoji) => {
    return L.divIcon({
        html: `<div style="font-size: 24px; text-shadow: 0px 0px 4px white;">${emoji}</div>`,
        className: 'custom-emoji-icon',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15]
    });
};

const markersLayer = L.layerGroup().addTo(map);
const allMarkers = [];

// Función para mostrar marcadores filtrados
const renderMarkers = (filterType) => {
    markersLayer.clearLayers();
    
    locations.forEach(loc => {
        if (filterType === 'all' || loc.type === filterType) {
            const marker = L.marker([loc.lat, loc.lng], { icon: createEmojiIcon(loc.icon) });
            
            const popupContent = `
                <div>
                    <h5>${loc.icon} ${loc.name}</h5>
                    <hr style="margin: 0.5rem 0;">
                    <p class="mb-1"><strong>Tipo:</strong> ${loc.type}</p>
                    <p class="mb-1"><strong>Provincia:</strong> ${loc.province}</p>
                    <p class="mb-0"><strong>Empresa:</strong> ${loc.company}</p>
                </div>
            `;
            
            marker.bindPopup(popupContent);
            markersLayer.addLayer(marker);
            allMarkers.push(marker);
        }
    });
};

// Renderizado inicial
renderMarkers('all');

// Lógica de botones de filtrado
const buttons = document.querySelectorAll('.filter-btn');
buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Actualizar estado activo
        buttons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        // Filtrar marcadores
        const type = e.target.getAttribute('data-filter');
        renderMarkers(type);
    });
});
