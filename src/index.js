//////////
function formatDate() {
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }

  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let currentDate = date.getDate();

  return `${currentDate} ${month}, ${day}, ${currentHours}:${currentMinutes}`;
}
let date = new Date();
let currentday = document.querySelector("#currentDateNow");
currentday.innerHTML = formatDate();
//////////////

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}
/////////////

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `  <div class= "row week-weather">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `

    <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
    
      <img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        class="week-image"
        alt="Weather image"
        width="42"
      />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperatures-max">${Math.round(
          forecastDay.temp.max
        )}&deg</span>
        <span class="weather-forecast-temperatures-min">${Math.round(
          forecastDay.temp.min
        )}&deg</span>
      </div>
    </div>
   `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

////////////

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5de5bc51cb1d29154fcd51057c2c4351";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}
/////

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");

  let currentCity = document.querySelector("#currentCity");
  currentCity.innerHTML = `${searchInput.value}`;

  let input = searchInput.value.trim();
  if (input) {
    currentCity.innerHTML = ` `;
  } else {
    currentCity.innerHTML = null;
    alert("Enter a location, please");
  }

  let city = searchInput.value;

  searchCity(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitFormSearch);

//////////////////

/////
function showWeather(response) {
  console.log();

  document.querySelector(".day-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector(
    ".currentCity"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  let feelsLike = Math.round(response.data.main.feels_like);
  let feelsElment = document.querySelector("#feelsLike");
  feelsElment.innerHTML = `${feelsLike} &degC`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
  celsiusTemperature = response.data.main.temp;
  console.log(response.data);
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function submitFormSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";

  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

searchCity("Kyiv");

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

///////

function displayLondonWeather(event) {
  event.preventDefault();
  let city = "London";
  searchCity(city);
}

let searchLondon = document.querySelector("#london-city");
searchLondon.addEventListener("click", displayLondonWeather);

function displayBarcelonaWeather(event) {
  event.preventDefault();
  let city = "Barcelona";
  searchCity(city);
}

let searchBarcelona = document.querySelector("#barcelona-city");
searchBarcelona.addEventListener("click", displayBarcelonaWeather);

function displayParisWeather(event) {
  event.preventDefault();
  let city = "Paris";
  searchCity(city);
}

let searchParis = document.querySelector("#paris-city");
searchParis.addEventListener("click", displayParisWeather);

function displayBerlinWeather(event) {
  event.preventDefault();
  let city = "Berlin";
  searchCity(city);
}

let searchBerlin = document.querySelector("#berlin-city");
searchBerlin.addEventListener("click", displayBerlinWeather);

function displayOntarioWeather(event) {
  event.preventDefault();
  let city = "Ontario";
  searchCity(city);
}

let searchOntario = document.querySelector("#ontario-city");
searchOntario.addEventListener("click", displayOntarioWeather);

function displayKyivWeather(event) {
  event.preventDefault();
  let city = "Kyiv";
  searchCity(city);
}

let searchKyiv = document.querySelector("#kyiv-city");
searchKyiv.addEventListener("click", displayKyivWeather);
