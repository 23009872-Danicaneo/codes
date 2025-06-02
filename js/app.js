// ShoreSquad App JS

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Leaflet map
  const map = L.map('map').setView([34.0195, -118.4912], 12); // Santa Monica Beach as default
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  L.marker([34.0195, -118.4912]).addTo(map)
    .bindPopup('Santa Monica Beach Cleanup!')
    .openPopup();

  // Weather Tracker: Fetch weather for Santa Monica Beach
  const weatherDiv = document.getElementById('weather-info');
  const lat = 34.0195;
  const lon = -118.4912;
  const apiKey = 'demo'; // Replace with your Open-Meteo API key if needed
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
    .then(response => response.json())
    .then(data => {
      if (data.current_weather) {
        const w = data.current_weather;
        weatherDiv.innerHTML = `
          <strong>${w.temperature}&deg;C</strong>, ${w.weathercode === 0 ? 'Clear' : 'See details'}<br>
          Wind: ${w.windspeed} km/h
        `;
      } else {
        weatherDiv.textContent = 'Weather data unavailable.';
      }
    })
    .catch(() => {
      weatherDiv.textContent = 'Unable to fetch weather.';
    });

  // Placeholder: List of upcoming cleanups
  const eventsList = document.getElementById('events-list');
  const sampleEvents = [
    { name: 'Sunset Beach Cleanup', date: '2025-06-10', location: 'Sunset Beach' },
    { name: 'Harbor Sweep', date: '2025-06-17', location: 'Harbor Point' }
  ];
  sampleEvents.forEach(event => {
    const li = document.createElement('li');
    li.textContent = `${event.name} - ${event.date} @ ${event.location}`;
    eventsList.appendChild(li);
  });
});
