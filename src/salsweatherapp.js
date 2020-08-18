function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thru", "Fri", "Sat"];
  let day = days[date.getDay()];

  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function showTemp(response) {
  console.log(response.data);
  celsiusTemp = response.data.main.temp;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(
    "#description"
  ).innerHTML = response.data.weather[0].description.toUpperCase();

  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );

  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute(
    "alt",
    `https://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );
}

function showForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
  <div class="col-2"> 
  <h3> 
  ${formatHours(forecast.dt * 1000)} 
  </h3>
  <img src="https://openweathermap.org/img/wn/${
    forecast.weather[0].icon
  }@2x.png" alt="Forecast weather icon"/>
<div class ="weather-forecast-temperature">
<strong>
${Math.round(forecast.main.temp_max)}° 
</strong> |
${Math.round(forecast.main.temp_min)}°</div>
</div>
  `;
  }
}

function search(city) {
  let apiKey = "93fb61f6d2280be6aeeee4b95724a5d9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(search);
}

function handleSumbit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let citySearch = document.querySelector("#current-city");
  cityElement.innerHTML = citySearch.nodeValue;
  let city = document.querySelector("#current-city").value;
  search(city);
}

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitChange = (celsiusTemp * 9) / 5 + 32;
  let scaleChange = document.querySelector("#currentTemp");
  scaleChange.innerHTML = Math.round(fahrenheitChange);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function showCelsius(event) {
  event.preventDefault();
  let scaleBack = document.querySelector("#currentTemp");
  scaleBack.innerHTML = Math.round(celsiusTemp);
  celsiusLink.checked = true;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", handleSumbit);

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", getLocation);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusTemp = null;
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

search("Baltimore");
