//fetch call to retrive data from the url and display it in console

let weather = { 
  apiKey: "3a4521251b064ec0e8998c6f984d498d",
  fetchWeather: function(city){
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
    + city 
    + "&units=imperial&appid=" 
    + this.apiKey
    )
    .then((response)=> response.json())
    .then((data)=> this.displayWeather(data));
},

//cure the data to return what we want 
displayWeather: function(data) {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  console.log(name, icon, description, temp, humidity, speed)
  // display the info above to the client 
  document.querySelector(".city").innerHTML = "Weather in " + name;
  //document.querySelector(".icon").src = 
  document.querySelector(".description").innerHTML = description;
  document.querySelector(".temp").innerHTML = temp + "°F";
  document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
  document.querySelector(".wind").innerHTML = "Wind Speed: " + speed + "m/h";
  // hide null index.html data until default city data has finished loading
  document.querySelector(".weather").classList.remove("loading");
  // genereate image based on city
  document.body.style.backgroundImage = "url('https://source.unsplash.com/random/?" + name + "')";
  },
  // this gets content (value) for whatever city is put in search bar
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  }
};
// now that you have the value, make search bar work
document.querySelector(".search button").addEventListener("click", function(){
  weather.search();
});
// add eventlistener for input box for when they press the 'enter' key instead of search icon
document.querySelector(".search-bar").addEventListener("keyup", function(event){
  if (event.key == "Enter") {
    weather.search();
  }
})
 //default weather data on page
weather.fetchWeather("Nashville");