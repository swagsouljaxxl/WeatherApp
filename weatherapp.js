let weather = {
  apiKey: "45e3f5cf5f538d750f0b8bf834d71136",
  waqiApiKey: "e1f5f731fa7deff00b57a48a1c62c227a6ab3ef0",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => {
        const rain = data.rain ? data.rain["1h"] : null;
        this.fetchAirQuality(city, data, rain);
      });
  },
  fetchAirQuality: function (city, weatherData, rain = null) {
    const waqiUrl = `https://api.waqi.info/feed/${city}/?token=${this.waqiApiKey}`;

    fetch(waqiUrl)
      .then((response) => {
        if (!response.ok) {
          alert("No air quality data found.");
          throw new Error("No air quality data found.");
        }
        return response.json();
      })
      .then((waqiData) => {
        this.displayWeather(weatherData, rain, waqiData);
      });
  },
  displayWeather: function (weatherData, rain = null, waqiData) {
    console.log(weatherData); // Log weather data for debugging
    console.log(waqiData); // Log air quality data for debugging

    const { name } = weatherData;
    const { icon, description } = weatherData.weather[0];
    const { temp, humidity, pressure } = weatherData.main;
    const { speed } = weatherData.wind;

    const airQuality = waqiData.data.aqi; // Air Quality Index

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
    document.querySelector(".pressure").innerText = "Pressure: " + pressure + "Pa";
    document.querySelector(".rain").innerText = "Rain intensity: " + (rain ? rain : "No data") + "%";
    document.querySelector(".air-quality").innerText = "Air Quality: " + airQuality + "AQI";

    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1920x1080/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

// The server part is not necessary for the client-side code. You can remove it if not needed.