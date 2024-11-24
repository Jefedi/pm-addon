// Initialisation de la carte
const map = L.map('map').setView([48.8566, 2.3522], 13); // Position de départ (Paris)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Fonction pour ajuster la taille de la carte après le changement d'état du menu
function adjustMapSize() {
  map.invalidateSize(); // Force le réajustement de la taille de la carte
}

// Écouteur d'événements pour le bouton de menu sur mobile
const menuToggle = document.getElementById('menu-toggle');
const formContainer = document.getElementById('form-container');

menuToggle.addEventListener('click', () => {
  formContainer.classList.toggle('hidden'); // Afficher ou masquer le menu
  adjustMapSize(); // Redimensionner la carte
});

// Fonction pour centrer la carte sur la position de l'utilisateur
document.getElementById('center-map-btn').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;
      map.setView([userLat, userLng], 15); // Centrer la carte sur la position
      L.marker([userLat, userLng]).addTo(map) // Ajouter un marqueur pour la position
        .bindPopup('Votre position')
        .openPopup();
    });
  } else {
    alert('Géolocalisation non supportée');
  }
});

// Fonction de recherche de PM
document.getElementById('search-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchTerm = document.getElementById('search-term').value;

  // Requête vers l'API pour chercher les PMs
  const res = await fetch(`/search-pm?searchTerm=${searchTerm}`);
  const result = await res.json();

  if (result.length > 0) {
    const pm = result[0]; // On prend le premier PM
    const lat = pm.lat;
    const lng = pm.lng;

    // Centrer la carte sur le PM
    map.setView([lat, lng], 15);
    L.marker([lat, lng]).addTo(map)
      .bindPopup(`<b>${pm.number}</b><br>${pm.address}<br>Latitude: ${lat}<br>Longitude: ${lng}`)
      .openPopup();
  } else {
    alert('Aucun PM trouvé.');
  }
});

// Formulaire d'ajout de PM
const form = document.getElementById('add-pm-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Récupération des données du formulaire
  const number = document.getElementById('pm-number').value;
  const address = document.getElementById('pm-address').value;
  const lat = parseFloat(document.getElementById('pm-lat').value);
  const lng = parseFloat(document.getElementById('pm-lng').value);

  // Ajout du marqueur sur la carte
  const marker = L.marker([lat, lng]).addTo(map);
  map.setView([lat, lng], 15);

  // Envoi des données au serveur
  await fetch('/add-pm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ number, address, lat, lng })
  });

  alert('PM ajouté avec succès !');
});
