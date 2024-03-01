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
  {name: 'Melbourne', data:'https://api.sunrise-sunset.org/json?lat=-37.813628&lng=144.963058&date=today&tzid=Australia/Melbourne'}, 
  {name: 'Hobart', data:'https://api.sunrise-sunset.org/json?lat=-42.8819032&lng=147.3238148&date=today&tzid=Australia/Hobart'}
];

// Hide error message and results card
errorMessage.style.display = "none";
sunCard.style.display = "none";
footer.style.display = "none";

// Loop through items and attach event listener to each button
items.forEach(item => {
  const button = document.getElementById(item.name.toLowerCase() + 'City'); // Assuming button IDs are lowercase city names followed by "City"
  if (button) {
    button.addEventListener('click', () => searchCity(item.name, item.data));
  }
});

// City Picker 
function searchCity(cityName, cityData) {
  fetch(cityData)
    .then(response => response.json())
    .then(json => {
      console.log('Button clicked for', cityName);
      console.log('Data', cityData);
      if (json.status === "OK") {
        const { sunrise, sunset } = json.results;
        errorMessage.style.display = "none";
        displayData(sunrise, sunset);
        // Write times to text file
        writeTimesToFile({ sunrise, sunset }, 'sunrise_sunset.txt');
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

// Call data from fetch to display
function displayData(sunrise, sunset) {
  sunCard.style.display = "block";
  footer.style.display = "block";
  sunriseTime.innerHTML = sunrise;
  sunsetTime.innerHTML = sunset;
}

// Function to write sunrise and sunset times to text file
function writeTimesToFile(times, fileName) {
  const content = `Sunrise: ${times.sunrise}\nSunset: ${times.sunset}`;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}

// Main function
async function main() {
  try {
      // Fetch sunrise and sunset times
      const { sunrise, sunset } = await fetchSunriseSunset();

      // Write times to text file
      writeTimesToFile({ sunrise, sunset }, 'sunrise_sunset.txt');
  } catch (error) {
      console.error("Error:", error);
  }
}
