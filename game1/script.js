let map;
let marker;

function initMap(lat, lng) {
  if (!map) {
    map = L.map('map').setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    marker = L.marker([lat, lng]).addTo(map)
      .bindPopup('You are here')
      .openPopup();
  } else {
    map.setView([lat, lng], 15);
    marker.setLatLng([lat, lng]);
  }
}

function getLocationAndShow() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        document.getElementById('location').textContent = `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`;
        initMap(lat, lng);
      },
      (error) => {
        alert("Location access denied or unavailable.");
        console.error(error);
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

document.getElementById('sosBtn').addEventListener('click', () => {
  const contact = document.getElementById('contact').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!contact || !message) {
    alert("Please enter both contact and message.");
    return;
  }

  alert(`🚨 SOS Sent!\n\nTo: ${contact}\nMessage: ${message}`);

  // Future integration: Send message via backend or SMS API
});

window.onload = getLocationAndShow;








