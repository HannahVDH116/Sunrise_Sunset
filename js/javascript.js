// Declaration of variables
const errorMessage = document.getElementById('errorMessage');
const sunCard = document.getElementById('sunCard');
const sunriseTime = document.getElementById('sunriseTime');
const sunsetTime = document.getElementById('sunsetTime');
const footer = document.getElementById('footer');

const apiUrl = 'https://api.sunrise-sunset.org/json?';

const items = [
  {name: 'Brisbane', data: 'https://api.sunrise-sunset.org/json?lat=-27.469770&lng=153.025131&date=today&tzid=Australia/Brisbane'}, 
  {name: 'Sydney', data: 'https://api.sunrise-sunset.org/json?lat=-33.868820&lng=151.209290&date=today&tzid=Australia/Sydney'}, 
  {name: 'Melbourne', data:'https://api.sunrise-sunset.org/json?lat=-37.813629&lng=144.963058&date=today&tzid=Australia/Melbourne'}, 
  {name: 'Hobart', data:'https://api.sunrise-sunset.org/json?lat=-42.87936000&lng=147.32941000&date=today&tzid=Australia/Hobart'},
  {name: 'Adelaide', data: 'https://api.sunrise-sunset.org/json?lat=-34.928497&lng=138.600739&date=today&tzid=Australia/Adelaide'}, 
  {name: 'Perth', data: 'https://api.sunrise-sunset.org/json?lat=-31.950527&lng=115.860458&date=today&tzid=Australia/Perth'}, 
  {name: 'Darwin', data: 'https://api.sunrise-sunset.org/json?lat=-12.46044&lng=130.841069&date=today&tzid=Australia/Darwin'}
];

// Hide error message and results card
errorMessage.style.display = "none";
sunCard.style.display = "none";
footer.style.display = "none";

// Loop through items and attach event listener to each button
items.forEach(item => {
  const button = document.getElementById(item.name.toLowerCase() + 'City'); // Assuming button IDs are lowercase city names followed by "City"
  if (button) {
    button.addEventListener('click', () => searchCity(item.name));
  }
});

// City Picker 
function searchCity(cityName) {
  const item = items.find(item => item.name === cityName);
  if (item) {
    fetch(item.data)
      .then(response => response.json())
      .then(json => {
        console.log('Button clicked for', cityName);
        console.log('Data', item.data);
        if (json.status === "OK") {
          const { sunrise, sunset } = json.results;
          errorMessage.style.display = "none";
          displayData(sunrise, sunset);
        } else {
          errorMessage.style.display = "block";
          errorMessage.innerHTML = "No Weather for You! (Weather not Found) 🫥 ";
        }
      })
      .catch(error => {
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "No-one's Home! (The API could not be reached) 😢 ";
      });
  }
}

// Call data from fetch to display
function displayData(sunrise, sunset) {
  sunCard.style.display = "block";
  footer.style.display = "block";
  sunriseTime.innerHTML = sunrise;
  sunsetTime.innerHTML = sunset;
}
