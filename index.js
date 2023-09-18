

// Function to fetch weather data based on the city name
function fetchWeatherData(city) {
     data {
        const apiKey = "6badaac9b1f02b67128a24c55a499a07"
        const apiUrl = ""
        
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Basic ${btoa(apiKey)}`,
            },
        });

        if (!response.ok) {
            throw new Error('Unable to fetch weather data.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}


// Function to update the weather dashboard with retrieved data
function updateWeatherDashboard(weatherData) {
    // Update weather icon, description, temperature, and city
    const weatherIcon = document.getElementById('weatherIcon');
    const weatherDescription = document.getElementById('weatherDescription');
    const temperature = document.querySelector('.temperature');
    const city = document.querySelector('.city');

    weatherIcon.src = 
    weatherDescription.textContent = weatherData.weather;
    temperature.textContent = `${weatherData.temperature_2m}°C`;
    city.textContent = weatherData.place;
    
    // Update humidity and wind speed
    const humidity = document.querySelector('.humidity');
    const wind = document.querySelector('.wind');

    humidity.textContent = `${weatherData.humidity_2m}% Humidity`;
    wind.textContent = `${weatherData.wind_speed_10m} km/h Wind Speed`;
}

// Function to handle errors and display a meaningful message
function handleError(error) {
    alert(`Error: ${error.message}`);
}

// Event listener for the search button
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', async () => {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();

    if (city === '') {
        alert('Please enter a city name.');
        return;
    }

    try {
        const weatherData = await fetchWeatherData(city);
        updateWeatherDashboard(weatherData);
    } catch (error) {
        handleError(error);
    }
});

window.onload = fetchData