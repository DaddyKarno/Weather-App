const cityName = document.querySelector(".searchBarInput");
document.getElementById("inputSearch").onclick = function () {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=4e2a28904642308191f507da7136a241`
  )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data);
      document.querySelector(".cityStyle").textContent = data.name;
      document.querySelector(".celsius").innerHTML =
        Math.round(data.main.temp - 273) + "°C";
      document.querySelector(".feelsCelsius").innerHTML =
        "feels like: " + Math.round(data.main.feels_like - 273) + "°C";
      document.querySelector(".weatherName").textContent =
        data.weather[0]["description"];
      document.querySelector(
        ".weatherImage"
      ).innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png" width="300" height="300">`;
    });
  cityName.value = "";
};
