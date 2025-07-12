const apiKey = "ec4467742701367058a71a6f644c986e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const toggleUnitBtn = document.getElementById("toggleUnitBtn");
const weatherIcon = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temp");

let currentTempCelsius = null; // Speicherung der Temperatur in Celsius
let isCelsius = true; // Aktuelle Temperatureinheit

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();

        if (data.cod !== 200) {
            alert("Stadt nicht gefunden!");
            return;
        }

        document.querySelector(".city").innerHTML = data.name;
        currentTempCelsius = data.main.temp;
        isCelsius = true;
        updateTemperatureDisplay();

        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const weatherMain = data.weather[0].main;
        if (weatherMain == "Clouds") {
            weatherIcon.src = "imgs/clouds.png";
        } else if (weatherMain == "Clear") {
            weatherIcon.src = "imgs/clear.png";
        } else if (weatherMain == "Rain") {
            weatherIcon.src = "imgs/rain.png";
        } else if (weatherMain == "Drizzle") {
            weatherIcon.src = "imgs/drizzle.png";
        } else if (weatherMain == "Mist") {
            weatherIcon.src = "imgs/mist.png";
        } else {
            weatherIcon.src = "";
        }
    } catch (error) {
        alert("Fehler beim Abrufen der Wetterdaten.");
        console.error(error);
    }
}

function updateTemperatureDisplay() {
    if (isCelsius) {
        tempElement.innerHTML = Math.round(currentTempCelsius) + "°C";
        toggleUnitBtn.textContent = "In Fahrenheit umrechnen";
    } else {
        const tempF = celsiusToFahrenheit(currentTempCelsius);
        tempElement.innerHTML = Math.round(tempF) + "°F";
        toggleUnitBtn.textContent = "In Celsius umrechnen";
    }
}

function celsiusToFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) checkWeather(city);
});

toggleUnitBtn.addEventListener("click", () => {
    if (currentTempCelsius === null) return;
    isCelsius = !isCelsius;
    updateTemperatureDisplay();
});