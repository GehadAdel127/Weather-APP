const apiKey = "42629736dd9d9584400a298a69aa0aa9";
const cityName = document.querySelector(".cityName");
const weatherForm = document.querySelector(".weatherForm");
const card = document.querySelector(".card");

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityName.value.trim();

    if (city) {
        try {
            const weatherData = await getData(city);
            displayInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError("Could not fetch weather data");
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayInfo(data) {
    card.innerHTML = "";
    card.style.display = "flex";

    console.log(data);
    
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const iconId = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
    const city = data.name;
    const description = data.weather[0].description.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

    card.innerHTML = `
        <h1 class="cityName">${city}</h1>
        <p class="temp">${temp.toFixed(1)}°C</p>
        <p class="humidity">Humidity: ${humidity}%</p>
        <p class="description">${description}</p>
        <img src="${iconUrl}" alt="Weather Icon" class="emoji" />
    `;
}

function displayError(message) {
    card.innerHTML = "";
    card.style.display = "flex";

    const error = document.createElement("p");
    error.textContent = message;
    error.classList.add("error");

    card.appendChild(error);
}
