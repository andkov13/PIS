document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '59461a8f8c07fecead4453ae704aa172'; //API key
    const cityId = '703448'; //код Києва
    //Створення запиту
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}`;

    fetch(apiUrl) //відправлення запиту
        .then(response => response.json()) //отримання відповіді на запит
        .then(data => {
            displayWeatherData(data); //виклик функції для візуалізації
        })
        .catch(error => console.error('Error fetching the weather data:', error));
});

function displayWeatherData(data) {
    const section = document.querySelector('section');
    const header = document.querySelector('header');

    header.textContent = `Місто: ${data.name}`;

    const temperature = document.createElement('p');
    temperature.textContent = `Температура: ${(data.main.temp - 273.15).toFixed(2)}°C (Відчувається як: ${(data.main.feels_like - 273.15).toFixed(2)}°C)`; // Convert Kelvin to Celsius
    section.appendChild(temperature);

    const weather = document.createElement('p');
    weather.textContent = `Погода: ${data.weather[0].description}`;
    section.appendChild(weather);

    const wind = document.createElement('p');
    wind.textContent = `Швидкість вітру: ${data.wind.speed} m/s`;
    section.appendChild(wind);

    const humidity = document.createElement('p');
    humidity.textContent = `Вологість повітря: ${data.main.humidity}%`;
    section.appendChild(humidity);
}

