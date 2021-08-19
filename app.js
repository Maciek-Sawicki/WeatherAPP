let weather = {
    "apiKey" : "18c6603aba6bd5a0644fb3ddafa49566",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city
        + "&units=metric&appid="
        + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind; 
        const { sunset } = data.sys;
        const { sunrise } = data.sys;
        const { timezone } = data;
        // console.log(name, icon, description, temp , humidity, speed, sunset);

        // console.log(timezone/3600);
        // console.log(timezone);

        // const unix = sunset;
        // const date = new Date(unix*1000);
        // const hours = date.getHours();
        // const minutes = date.getMinutes();
        // const sunsetTime = hours*60+minutes;

        const dateSunset = new Date(sunset*1000);
        const hoursSunset = dateSunset.getHours();
        const minutesSunset = dateSunset.getMinutes();
        const sunsetTime = hoursSunset*60+minutesSunset;

        const dateSunrise = new Date(sunrise*1000);
        const hoursSunrise = dateSunrise.getHours();
        const minutesSunrise = dateSunrise.getMinutes();
        const sunriseTime = hoursSunrise*60+minutesSunrise;




        // console.log(hours);
        // console.log(minutes);
        

        const today = new Date();
        let currentTimeM = (today.getUTCHours()+timezone/3600)*60+today.getUTCMinutes();

        let currentHours = today.getUTCHours()+timezone/3600;
        let currentMinutes = today.getUTCMinutes();
        
        if (currentMinutes < 10) {
            currentMinutes = "0"+  today.getUTCMinutes();
        }

        let currentTime = currentHours+":"+currentMinutes+"AM";

        if (currentHours > 12) {
            currentTime = currentHours-12+":"+currentMinutes+"PM";
        }

        if (currentHours > 24) {
            currentTime = currentHours-24+":"+currentMinutes+"AM";
        }

        // console.log(currentMinutes);

        // if ((today.getUTCHours()+timezone/3600 > 12) && (timezone < 0)) {
        //     currentTime = today.getUTCHours()-12+timezone/3600+":"+today.getUTCMinutes()+"PM";
            
        // }

        // console.log("sunsetTime:",sunsetTime);
        // console.log("currentTimeM",currentTimeM);
        // console.log("sunriseTime:",sunriseTime);






        if ((sunsetTime - 60) <= currentTimeM) {
            document.querySelector("body").classList.remove("night");
            document.querySelector("body").classList.remove("day");
            document.querySelector("body").classList.add("sunset");
        }

        if ((sunsetTime + 30) <= currentTimeM) {
            document.querySelector("body").classList.remove("sunset");
            document.querySelector("body").classList.remove("day");
            document.querySelector("body").classList.add("night");
        }

        

        if ((currentTimeM >= (sunriseTime - 30))&& (currentTimeM < sunsetTime)) {
            document.querySelector("body").classList.remove("sunset");
            document.querySelector("body").classList.remove("night");
            document.querySelector("body").classList.add("day");
        }
        
        console.log("sunsetTime:",sunsetTime);
        console.log("currentTimeM",currentTimeM);
        console.log("sunriseTime:",sunriseTime);

        document.querySelector(".cur-time").innerText = currentTime;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
        // document.querySelector(".")
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

weather.fetchWeather("Warsaw");