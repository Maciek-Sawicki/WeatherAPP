let weather = {
    "apiKey" : "18c6603aba6bd5a0644fb3ddafa49566",
    fetchWeather: function (city) {
        fetch("http://api.openweathermap.org/data/2.5/weather?q=" 
        + city
        + "&units=metric&appid="
        + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => console.log(data));
    },
    displayWeather: function(data) {

    }
};