const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherDisplay = document.getElementById('weather-display');

// Chart instance
let forecastChart = null;

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) searchCity(city);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) searchCity(city);
    }
});

// Initial load
fetchHistory();

function searchCity(city) {
    // Show loading state (optional improvement)

    fetch(`/get_weather?city=${encodeURIComponent(city)}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                return;
            }
            updateUI(data);
            fetchHistory(); // Update history list
        })
        .catch(err => {
            console.error(err);
            alert('Failed to fetch weather data');
        });
}

function updateUI(data) {
    const current = data.current;

    // Unhide display
    weatherDisplay.classList.remove('hidden');

    // Update Current Weather
    document.getElementById('city-name').textContent = `${current.name}, ${current.sys.country}`;
    document.getElementById('date-time').textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('temperature').textContent = `${Math.round(current.main.temp)}°`;
    document.getElementById('weather-desc').textContent = current.weather[0].description;
    document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;

    document.getElementById('humidity').textContent = `${current.main.humidity}%`;
    document.getElementById('wind-speed').textContent = `${current.wind.speed} m/s`;
    document.getElementById('clouds').textContent = `${current.clouds.all}%`;

    // Initialize or Update Chart
    updateChart(data.forecast);
}

function updateChart(forecastData) {
    const ctx = document.getElementById('forecastChart').getContext('2d');

    // Process forecast data (next 5 entries -> approx 15 hours, but user asked for next 5 hours)
    // OpenWeatherMap free API gives 3-hour intervals. We can show the next 5 data points (15 hours) or strictly interpolation.
    // Let's show the next 5 intervals available (3h steps).

    const next5 = forecastData.list.slice(0, 5);
    const labels = next5.map(item => {
        const date = new Date(item.dt * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });
    const temps = next5.map(item => item.main.temp);

    if (forecastChart) {
        forecastChart.destroy();
    }

    forecastChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temps,
                borderColor: '#00f2fe',
                backgroundColor: 'rgba(0, 242, 254, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: '#00f2fe'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            }
        }
    });
}

function fetchHistory() {
    fetch('/history')
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById('history-list');
            list.innerHTML = '';
            // unique cities set to avoid duplicates in display if backend doesn't handle it
            const uniqueCities = new Set();

            data.forEach(item => {
                if (!uniqueCities.has(item[0])) {
                    uniqueCities.add(item[0]);
                    const li = document.createElement('li');
                    li.className = 'history-item';
                    li.textContent = item[0];
                    li.onclick = () => searchCity(item[0]);
                    list.appendChild(li);
                }
            });
        });
}
