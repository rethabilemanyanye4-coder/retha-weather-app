function recentWeather(response) {
  // 1. Update the temperature
  let temperatureElement = document.querySelector(".current-temperature-value");
  let temperature = Math.round(response.data.temperature.current);
  let descriptionElement=document.querySelector("#description");
  let humidityElement=document.querySelector("#humidity");
  let windSpeedElement= document.querySelector("#wind-speed");
  

 
  temperatureElement.innerHTML = temperature;
  descriptionElement.innerHTML= response.data.condition.description;
  humidityElement.innerHTML=`${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML=`${response.data.wind.speed}km/h`;

  // 2. Update the city name to match what the API found (improves spelling)
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;

  getforecast(response.data.city);

}

function searchCity(city) {
  let apiKey = "f471a068ffaaf7bot45233b482c5cd2d";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(recentWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  // Call the API function with the value from the search bar
  searchCity(searchInput.value);
}
function formatDay(timestamp){
  let date=new Date(timestamp +1000);
  let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  return days[date.getDay()];

}





function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let dayIndex = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
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

  let formattedDay = days[dayIndex];
  return `${formattedDay} ${hours}:${minutes}`;
}

function getforecast(city){
  let apiKey="f471a068ffaaf7bot45233b482c5cd2d";
  let apiUrl=`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axiom(apiUrl).then(displayforecast);
}
function displayforecast(response){

  let days=['Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let forecastHtml="";
  response.data.daily.forEach(function(day ,index){
    if (index < 5 ){
    forecastHtml=
  
    forecastHtml +`
  <div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            
            <img src="${day.condition.icon_url}" class="weather-forecast-icon" /> 
            <div class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}°</strong>${Math.round(day.temperature.minimum)}°</div> 
              </div>`
            
;}
}
   );

let forecastElement= document.querySelector("#forecast");
forecastElement.innerHTML=forecastHtml;
}

// Event Listeners
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

// Initial State
let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);

// Load Paris by default when the page starts
searchCity("Paris");
displayforecast();
 
