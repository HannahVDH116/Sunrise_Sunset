const sunriseButton = document.getElementById('sunriseButton')
const errorMessage = document.getElementById('errorMessage')
const sunCard = document.getElementById('sunCard')
const sunriseTime = document.getElementById('sunriseTime')
const sunsetTime = document.getElementById('sunsetTime')


errorMessage.style.display = "none"
sunCard.style.display = "none"

sunriseButton.addEventListener("click", searchSun)

async function searchSun (){
  try{
    const res = await fetch('https://api.sunrise-sunset.org/json?lat=-42.87936000&lng=147.32941000&date=today&tzid=Australia/Hobart')
    const json = await res.json()
    console.log(json);
    errorMessage.style.display = "none"
    displayData(json);
  } catch(error) {
    errorMessage.style.display = "block"
    errorMessage.innerHTML = "No-one's Home! (The API could not be reached!) 😢 "
  }
  
}

function displayData(results){
  console.log(results.Error)
  if(results.Error){
    errorMessage.style.display = "block"
    errorMessage.innerHTML = "No sunshine for You! (Times not Found!) 🫥 "
    return;
  }
  
sunCard.style.display = "block"
sunriseTime.innerHTML = results.sunrise
sunsetTime.innerHTML = results.sunset
}