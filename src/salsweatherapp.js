function accurateTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let dayIndex = days[day];
  console.log(dayIndex);

  return `${dayIndex} ${hours}:${minutes}`;
}

function showTemp(response) {
  console.log(response.data);
  celsiusTemp = response.data.main.temp;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML =
    Math.round.response.data.wind.speed;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );
}

function handleSumbit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let citySearch = document.querySelector("#current-city");
  cityElement.innerHTML = citySearch.nodeValue;
  let city = document.querySelector("#current-city").value;
  search(city);
}

function search(city) {
  let apiKey = "93fb61f6d2280be6aeeee4b95724a5d9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function searchLocation(position) {
  let apiKey = "93fb61f6d2280be6aeeee4b95724a5d9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
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
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
let timeDate = document.querySelector("#time");
let now = new Date();
timeDate.innerHTML = accurateTime(now);

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
