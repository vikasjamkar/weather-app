let apiKey = "dcc2fb92ad8c128198cd0cf84f28b893";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let city = document.getElementById("txtSearch");
let btnSearch = document.getElementById("btnSearch");
let poster = document.getElementById("banner");
let cloudImg = document.getElementById("img");

let suggestCity = document.querySelectorAll(".sugg-city");

const getWeatherData = async (city) => {
  let response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    document.getElementById("error").innerHTML =
      "Invalid City Try again".fontcolor("red");
    document.getElementById("error").style.display.transition = "1s";
  } else {
    document.getElementById("error").innerHTML = "";
  }

  let data = await response.json();
  console.log(data);

  document.getElementById("humidity").innerHTML = data.main.humidity + "%";
  document.getElementById("wind").innerHTML = data.wind.speed + "km/h";
  document.getElementById("temp").innerHTML = Math.round(data.main.temp) + "°";
  document.getElementById("city").innerHTML = data.name;
  document.getElementById("cloud").innerHTML = data.clouds.all + "%";
  document.querySelector(
    ".max"
  ).innerHTML = `<i class="fa-solid fa-temperature-arrow-up"></i> ${data.main.temp_max} °`;

  document.querySelector(
    ".min"
  ).innerHTML = `<i class="fa-solid fa-temperature-arrow-down"></i> ${data.main.temp_min} ° |`;

  if (data.weather[0].description === "clear sky") {
    poster.src = "./public/images/sunny.jpg";
    cloudImg.src = "./public/images/clear.png";
    cloudImg.style.display = "block";
    document.querySelector(".description").innerText =
      data.weather[0].description;
  } else if (data.weather[0].description === "broken clouds") {
    poster.src = "./public/images/clearcloud.jpg";
    cloudImg.src = "./public/images/scatterd.png";
    cloudImg.style.display = "block";
    document.querySelector(".description").innerText =
      data.weather[0].description;
  } else if (data.weather[0].description === "scattered clouds") {
    poster.src = "./public/images/sun.jpg";
    cloudImg.src = "./public/images/scatterd.png";
    cloudImg.style.display = "block";
    document.querySelector(".description").innerText =
      data.weather[0].description;
  } else if (data.weather[0].description === "overcast clouds") {
    poster.src = "./public/images/cloud.jpg";
    cloudImg.src = "./public/images/broken.png";
    cloudImg.style.display = "block";
    document.querySelector(".description").innerText =
      data.weather[0].description;
  } else if (data.weather[0].description === "moderate rain") {
    poster.src = "./public/images/newrain.avif";
    cloudImg.src = "./public/images/shower.png";
    cloudImg.style.display = "block";
    document.querySelector(".description").innerText =
      data.weather[0].description;
  } else if (data.weather[0].description === "rain") {
    poster.src = "./public/images/newrain.avif";
    cloudImg.src = "./public/images/rain.png";
    cloudImg.style.display = "block";
    document.querySelector(".description").innerText =
      data.weather[0].description;
  } else if (data.weather[0].description === "snow") {
    poster.src = "./public/images/snowback.avif";
    cloudImg.src = "./public/images/snow.png";
    cloudImg.style.display = "block";
    document.querySelector(".description").innerText =
      data.weather[0].description;
  } else if (data.weather[0].description === "haze") {
    poster.src = "./public/images/haze.avif";
    cloudImg.src = "./public/images/thunder.png";
    cloudImg.style.display = "block";
    document.querySelector(".description").innerText =
      data.weather[0].description;
  } else if (data.weather[0].description === "mist") {
    cloudImg.src = "./public/images/mist.png";
    cloudImg.style.display = "block";
    document.querySelector(".description").innerText =
      data.weather[0].description;
  }
};

btnSearch.addEventListener("click", () => {
  btnSearch.disabled = true;
  btnSearch.style.cursor = "not-allowed";
  btnSearch.style.backgroundColor = "grey";
  getWeatherData(city.value);
});

suggestCity.forEach((name) => {
  name.addEventListener("click", () => {
    const result = name.getAttribute("id");
    city.value = result;
    getWeatherData(result);
  });
});

city.addEventListener("keyup", () => {
  document.getElementById("error").innerHTML = "";
  btnSearch.disabled = false;
  btnSearch.style.cursor = "pointer";
  btnSearch.style.backgroundColor = "black";
  document.getElementById("humidity").innerHTML = "";
  document.getElementById("wind").innerHTML = "";
  document.getElementById("temp").innerHTML = "";
  document.getElementById("city").innerHTML = "";
  document.getElementById("cloud").innerHTML = "";
  document.querySelector(".max").innerHTML = "";
  document.querySelector(".min").innerHTML = "";
  poster.src = "haze.avif";
  document.querySelector(".description").innerHTML = "";
  cloudImg.style.display = "none";
});
