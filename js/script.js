var towns = [];

var cityEl = document.querySelector("#town-search");
var thecity = document.querySelector("#cities");
var weathernow = document.querySelector("#weather-now");
var searchOfCity = document.querySelector("#city-search");
var futurWeather = document.querySelector("#future");
var theContainerEl = document.querySelector("#next-days");
var pastSearchingEl = document.querySelector("#prev-search");

var Submitform = function (event) {
  event.preventDefault();
  var city = thecity.value.trim();
  if (city) {
    theWeather(city);
    get5Day(city);
    towns.unshift({ city });
    thecity.value = "";
  } else {
    alert("Enter city name ");
  }
  savemySearch();
  pastSearching(city);
};

var savemySearch = function () {
  console.log(towns);
  localStorage.setItem("cities", JSON.stringify(towns));
};
//url api
var theWeather = function (town) {
  var apiKey = "844421298d794574c100e3409cee0499";
  var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${town}&units=imperial&appid=${apiKey}`;

  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      getWeatherDisp(data, town);
    });
  });
};

var getWeatherDisp = function (dayweath, searchTheCity) {
  //clear all the old content 
  weathernow.textContent = "";
  searchOfCity.textContent = searchTheCity;

  

  // date elements
  var sameDate = document.createElement("span");
  sameDate.textContent =
    " (" + moment(dayweath.dt.value).format("MMM D, YYYY") + ") ";
  searchOfCity.appendChild(sameDate);

  //the image element
  var weatherIcon = document.createElement("img");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${dayweath.weather[0].icon}@2x.png`
  );
  searchOfCity.appendChild(weatherIcon);

  var Submitform = function (event) {
    event.preventDefault();
    var city = thecity.value.trim();
    if (city) {
      theWeather(city);
      get5Day(city);
      towns.unshift({ city });
      thecity.value = "";
    } else {
      alert("Enter city name ");
    }
    savemySearch();
    pastSearching(city);
  };
  
  var savemySearch = function () {
    console.log(towns);
    localStorage.setItem("cities", JSON.stringify(towns));
  };
  
  var theWeather = function (town) {
    var apiKey = "844421298d794574c100e3409cee0499";
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${town}&units=imperial&appid=${apiKey}`;
  
    fetch(apiURL).then(function (response) {
      response.json().then(function (data) {
        console.log(data);
        getWeatherDisp(data, town);
      });
    });
  };
  
  var getWeatherDisp = function (dayweath, searchTheCity) {
    //clear old content
    weathernow.textContent = "";
    searchOfCity.textContent = searchTheCity;
  
    //console.log(weather);
  
    //create date element
    var sameDate = document.createElement("span");
    sameDate.textContent =
      " (" + moment(dayweath.dt.value).format("MMM D, YYYY") + ") ";
    searchOfCity.appendChild(sameDate);
  
    //create an image element
    var weatherIcon = document.createElement("img");
    weatherIcon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${dayweath.weather[0].icon}@2x.png`
    );
    searchOfCity.appendChild(weatherIcon);
  
    //wind
    var windSpeedEl = document.createElement("span");
    windSpeedEl.textContent = "Wind Speed: " + dayweath.wind.speed + " MPH";
    windSpeedEl.classList = "list-group-item";
    //temperature
    var temp = document.createElement("span");
    temp.textContent = "Temperature: " + dayweath.main.temp + " °F";
    temp.classList = "list-group-item";
  
    //Humidity
    var humidityEl = document.createElement("span");
    humidityEl.textContent = "Humidity: " + dayweath.main.humidity + " %";
    humidityEl.classList = "list-group-item";
  
    
  