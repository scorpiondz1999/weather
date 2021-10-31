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
  
  //append all three to container 
  weathernow.appendChild(windSpeedEl);

  
  weathernow.appendChild(temp);

  
  weathernow.appendChild(humidityEl);
//UV index
  var getLat = dayweath.coord.lat;
  var lone = dayweath.coord.lon;
  latLon(getLat, lone);
};

var latLon = function (lat, lon) {
  var apiKey = "844421298d794574c100e3409cee0499";
  var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      displayLatLon(data);
    });
  });
};
var displayLatLon = function (index) {
  var toTheEl = document.createElement("div");
  toTheEl.textContent = "UV Index: ";
  toTheEl.classList = "list-group-item";

  uvIndexValue = document.createElement("span");
  uvIndexValue.textContent = index.value;

  if (index.value <= 2) {
    uvIndexValue.classList = "favorable";
  } else if (index.value > 2 && index.value <= 8) {
    uvIndexValue.classList = "moderate ";
  } else if (index.value > 8) {
    uvIndexValue.classList = "severe";
  }

  toTheEl.appendChild(uvIndexValue);

  //append index to current weather
  weathernow.appendChild(toTheEl);
};

var get5Day = function (city) {
  var apiKey = "844421298d794574c100e3409cee0499";
  var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      displayFiveDays(data);
    });
  });
};

var displayFiveDays = function (weather) {
  theContainerEl.textContent = "";
  futurWeather.textContent = "5-Day Forecast:";

  var forecast = weather.list;
  for (var i = 5; i < forecast.length; i = i + 8) {
    var dailyForecast = forecast[i];

    var forecastEl = document.createElement("div");
    forecastEl.classList = "card bg-primary text-light m-2";

    var date = document.createElement("h5");
    date.textContent = moment.unix(dailyForecast.dt).format("MMM D, YYYY");
    date.classList = "card-header text-center";
    forecastEl.appendChild(date);

    //image element
    var weatherIcon = document.createElement("img");
    weatherIcon.classList = "card-body text-center";
    weatherIcon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`
    );

    
    forecastEl.appendChild(weatherIcon);

    
  