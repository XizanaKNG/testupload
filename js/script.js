const locationApiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=27.27&longitude=77.7777&current_weather=true';

const weatherIcons = {
    snow: './assets/snow_icon.png',
    rain: './assets/rain_icon.png',
    warm: './assets/warm_icon.png',
    hot: './assets/hot_icon.png'
};

const timeIcons = {
    day: './assets/day_icon.png',
    night: './assets/night_icon.png'
};

const windIcon = './assets/speed.png';
const locationIcon = './assets/map.png';

fetch(locationApiUrl)
    .then(response => response.json())
    .then(data => {
        const latitude = data.latitude;
        const longitude = data.longitude;
        const temperatureCelsius = data.current_weather.temperature;
        const temperatureFahrenheit = (temperatureCelsius * 9/5) + 32;
        const windSpeed = data.current_weather.windspeed;
        const isDay = data.current_weather.is_day;

        document.getElementById('latitude').textContent = `Latitude: ${latitude}`;
        document.getElementById('longitude').textContent = `Longitude: ${longitude}`;
        document.getElementById('temperature-celsius').textContent = `${temperatureCelsius}°`;
        document.getElementById('temperature-fahrenheit').textContent = `°F ${temperatureFahrenheit.toFixed(1)}`;
        document.getElementById('wind-speed').textContent = `${windSpeed} km/h`;
        document.getElementById('wind-icon').src = windIcon;
        document.getElementById('location-icon').src = locationIcon;

        let weatherIcon;
        if (temperatureCelsius <= -1) {
            weatherIcon = weatherIcons.cold;
        } else if (temperatureCelsius <= 10) {
            weatherIcon = weatherIcons.cool;
        } else if (temperatureCelsius <= 30) {
            weatherIcon = weatherIcons.warm;
        } else {
            weatherIcon = weatherIcons.hot;
        }

        const timeIcon = isDay ? timeIcons.day : timeIcons.night;

        document.getElementById('weather-icon').innerHTML = `<img src="${weatherIcon}" alt="Weather Icon">`;
        document.getElementById('time-icon').innerHTML = `<img src="${timeIcon}" alt="Time Icon">`;
    })
    
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.page-button');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    let currentPage = 1;

    function updatePagination(newPage) {
        currentPage = newPage;
        buttons.forEach(button => {
            if (button.textContent == currentPage) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const pageNumber = parseInt(button.textContent);
            if (!isNaN(pageNumber)) {
                updatePagination(pageNumber);
            }
        });
    });

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            updatePagination(currentPage - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < 10) {
            updatePagination(currentPage + 1);
        }
    });

    updatePagination(currentPage);
});