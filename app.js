let weather = {
    "apiKey": "18c6603aba6bd5a0644fb3ddafa49566",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.apiKey
            )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const {
            name
        } = data;
        const {
            icon,
            description
        } = data.weather[0];
        const {
            temp,
            humidity
        } = data.main;
        const {
            speed
        } = data.wind;
        const {
            sunset
        } = data.sys;
        const {
            sunrise
        } = data.sys;
        const {
            timezone
        } = data;

        const today = new Date();

        let currentHours = today.getUTCHours() + timezone / 3600;
        let currentMinutes = today.getUTCMinutes();

        if (currentMinutes < 10) {
            currentMinutes = "0" + today.getUTCMinutes();
        }

        let currentTime = currentHours + ":" + currentMinutes + "AM";

        if (currentHours > 12) {
            currentTime = currentHours - 12 + ":" + currentMinutes + "PM";
        }

        if (currentHours > 24) {
            currentTime = currentHours - 24 + ":" + currentMinutes + "AM";
        }
        document.querySelector(".cur-time").innerText = currentTime;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
})

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
})

weather.fetchWeather("Białystok");