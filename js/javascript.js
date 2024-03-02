document.addEventListener('DOMContentLoaded', function() {
  // Declaration of variables
  const errorMessage = document.getElementById('errorMessage');
  const sunCard = document.getElementById('sunCard');
  const sunriseTime = document.getElementById('sunriseTime');
  const sunsetTime = document.getElementById('sunsetTime');
  const printButton = document.getElementById('print');
  const footer = document.getElementById('footer');

  const apiUrl = 'https://api.sunrise-sunset.org/json?';

  const items = [
      { name: 'Brisbane', data: 'https://api.sunrise-sunset.org/json?lat=-27.469770&lng=153.025131&date=today&tzid=Australia/Brisbane' },
      { name: 'Sydney', data: 'https://api.sunrise-sunset.org/json?lat=-33.868820&lng=151.209290&date=today&tzid=Australia/Sydney' },
      { name: 'Melbourne', data: 'https://api.sunrise-sunset.org/json?lat=-37.813628&lng=144.963058&date=today&tzid=Australia/Melbourne' },
      { name: 'Hobart', data: 'https://api.sunrise-sunset.org/json?lat=-42.8819032&lng=147.3238148&date=today&tzid=Australia/Hobart' }
  ];

  // Hide error message, print button results card
  errorMessage.style.display = "none";
  sunCard.style.display = "none";
  printButton.style.display = 'none';
  footer.style.display = "none";

  let selectedCity = null;

  // Loop through items and attach event listener to each button
  items.forEach(item => {
      const button = document.getElementById(item.name.toLowerCase() + 'City');
      if (button) {
          button.addEventListener('click', () => {
              selectedCity = item;
              searchCity(item.name, item.data);
          });
      }
  });

  // Add event listener to print button
  if (printButton) {
      printButton.addEventListener('click', () => {
          if (selectedCity) { 
              main(selectedCity);
          } else {
              displayError("No city selected.");
          }
      });
  }

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
      printButton.style.display = "block";
      footer.style.display = "block";
      sunriseTime.innerHTML = sunrise;
      sunsetTime.innerHTML = sunset;
  }

  // Main function
  async function main(city) {
      try {
          const response = await fetch(city.data);
          const json = await response.json();

          if (json.status === "OK") {
              const { sunrise, sunset } = json.results;
              writeTimesToFile({ sunrise, sunset });
          } else {
              displayError("Error fetching sunrise and sunset times.");
          }
      } catch (error) {
          console.error("Error:", error);
          displayError("An error occurred while fetching sunrise and sunset times.");
      }
  }

  // Function to write sunrise and sunset times to text file
  function writeTimesToFile(times) {
    const content = `Sunrise: ${times.sunrise}\nSunset: ${times.sunset}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Create an anchor element with download attribute to trigger file download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sunrise_sunset.txt';
    a.style.display = 'none';

    // Append the anchor element to the document body and simulate a click event
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Function to display error message
function displayError(message) {
    errorMessage.style.display = "block";
    errorMessage.innerHTML = message;
}
});