const cityName = document.querySelector(".searchBarInput");
setInterval(() => {
  let timeInCity = new Date();
  document.querySelector(".timeStyle").textContent =
    timeInCity.toLocaleTimeString();
  document.querySelector(".dateStyle").textContent =
    timeInCity.toLocaleDateString();
}, 1000);
document.getElementById("inputSearch").onclick = function () {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=4e2a28904642308191f507da7136a241`
  )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      try {
        document.querySelector(".cityStyle").textContent = data.name;
        document.querySelector(".celsius").textContent =
          roundCelsius(data.main.temp) + "°C";
        document.querySelector(".feelsCelsius").textContent =
          "feels like: " + roundCelsius(data.main.feels_like) + "°C";
        document.querySelector(".weatherName").textContent =
          data.weather[0]["description"];
        document.querySelector(
          ".weatherImage"
        ).innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png" width="600" height="600">`;
        document.querySelector(".sunriseTimeStyle").textContent =
          `Sunrise\n` + suntime(data.sys.sunrise * 1000);
        document.querySelector(".sunsetTimeStyle").textContent =
          `Sunset\n` + suntime(data.sys.sunset * 1000);
        document.querySelector(".Humidity").textContent =
          data.main.humidity + " %";
        document.querySelector(".Pressure").textContent =
          data.main.pressure + "hPa";
        document.querySelector(".windSpeed").textContent =
          data.wind.speed + "km/h";
      } catch {
        alert(data.cod + " " + data.message);
      }
    });

  cityName.value = "";
};
function roundCelsius(сelcius) {
  let a = Math.round(сelcius - 273);
  return a;
}
function suntime(suntime) {
  let sunrise = new Date(suntime);
  return sunrise.toLocaleTimeString();
}
