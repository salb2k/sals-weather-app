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
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
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
let timeDate = document.querySelector("#time");
let now = new Date();
timeDate.innerHTML = accurateTime(now);

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", handleSumbit);

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", getLocation);

search("Baltimore");
