const apiKey = 'c961b789396f38537f59ec6ab1bba572';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';


const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.main && data.weather && data.weather[0]) {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${(Math.round((data.main.temp) * (9/5) + 32))}°F ` + data.weather[0].description;

        } else {
            console.error('Invalid API response:', data);
            locationElement.textContent = "Error";
            temperatureElement.textContent = "Location could not be found (Try Again)"
        }
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });

}
