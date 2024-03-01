// start Declaration of variables
  const sunshineButton = document.getElementById('sunshineButton');
  const errorMessage = document.getElementById('errorMessage');
  const sunCard = document.getElementById('sunCard');
  const sunriseTime = document.getElementById('sunriseTime');
  const sunsetTime = document.getElementById('sunsetTime');
  const footer = document.getElementById('footer');
  const cityPicker = document.getElementById('cityPicker')

  const apiUrl = 'https://api.sunrise-sunset.org/json?';

  const Brisbane = document.getElementById('brisbaneCity'); 
  const Sydney = document.getElementById('sydneyCity');
  const Melbourne = document.getElementById('melbourneCity');  
  const Hobart = document.getElementById('hobartCity'); 
  const Adelaide = document.getElementById('adelaideCity'); 
  const Perth = document.getElementById('perthCity'); 
  const Darwin = document.getElementById('darwinCity'); 
// end Declaration of variables

// start Hide error message and results card
  errorMessage.style.display = "none";
  sunCard.style.display = "none";
  footer.style.display = "none";
  // end Hide error message and result card

  // start Event listener
  document.addEventListener("click", searchCity);
// end Event listener

// start City Picker
const items = [
  {name: 'Brisbane', data: 'https://api.sunrise-sunset.org/json?lat=-27.469770&lng=153.025131&date=today&tzid=Australia/Brisbane'}, 
  {name: 'Sydney', data: 'https://api.sunrise-sunset.org/json?lat=-33.868820&lng=151209290&date=today&tzid=Australia/Sydney'}, 
  {name: 'Melbourne', data:'https://api.sunrise-sunset.org/json?lat=-37.813629&lng=144.963058&date=today&tzid=Australia/Melbourne'}, 
  {name: 'Hobart', data:'https://api.sunrise-sunset.org/json?lat=-42.87936000&lng=147.32941000&date=today&tzid=Australia/Hobart'},
  {name: 'Adelaide', data: 'https://api.sunrise-sunset.org/json?lat=-34.928497&lng=138.600739&date=today&tzid=Australia/Adelaide'}, 
  {name: 'Perth', data: 'https://api.sunrise-sunset.org/json?lat=-31.950527&lng=115.860458&date=today&tzid=Australia/Perth'}, 
  {name: 'Darwin', data: 'https://api.sunrise-sunset.org/json?lat=-12.46044&lng=130.841069&date=today&tzid=Australia/Darwin'}
]
// end City Picker

// start API fetch
  async function searchCity(Name){
    for(let i = 0; i <items.length; i++){
      if(items[i].name === Name){
    try{
      const res = await fetch(items.data);
      const json = await res.json();
      console.log(json);
      console.log('Button clicked for', itemName);
      console.log('Data', items[i].data)
      break;
// end API fetch

// start Call error messages
      if(json.status === "OK"){
        const {sunrise, sunset} = json.results;
        errorMessage.style.display = "none";
        displayData(sunrise, sunset);
        } else {
          errorMessage.style.display = "block"
          errorMessage.innerHTML = "No Sunshine for You! (Weather not Found) 🫥 "
        } 
    } catch(error) {
      errorMessage.style.display = "block"
      errorMessage.innerHTML = "No-one's Home! (The API could not be reached) 😢 "
    }     
  }
}
//end Call error message

// start Call data from fetch to display
  function displayData(sunrise, sunset){
    sunCard.style.display = "block"
    footer.style.display = "block"
    sunriseTime.innerHTML = sunrise
    sunsetTime.innerHTML = sunset
  };
}
//end Call data from fetch to display 