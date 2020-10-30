/* Global Variables */
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';
const COUNTRY = 'us';
const API_KEY = '62e179490a29bc17c56de5ec36a7e37d';
const MY_SERVER_URL = 'http://localhost:3000';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
const zip = document.getElementById('zip').value;
const feelings = document.getElementById('feelings').value;
getWeather(zip, feelings);
}
/* Function to GET Web API Data*/
/* Function to POST data */
/* Function to GET Project Data */
const getWeather = async (zip, feelings) => {
const res =
fetch(`${BASE_URL}?APPID=${API_KEY}&zip=${zip},${COUNTRY}`) // GET
.then(response => response.json())
.then(data => {
// Add data
const tempKelvin = data.main.temp;
const d = new Date();
const formattedDate = d.getMonth()+ 1 + '/' + d.getDate() + '/' + d.getFullYear();
return postData(`${MY_SERVER_URL}/addData`, { // POST
date: formattedDate,
temperature: tempKelvin,
feelings: feelings,
});
})
.then(() => fetch(`${MY_SERVER_URL}/all`)) // GET returns the fetch promise
.then(response => response.json())
.then(allData => {
const data = allData[allData.length - 1];
document.getElementById('date').innerHTML =`Today is ${data.date}`;
document.getElementById('temp').innerHTML = `The temperature now is ${formatTemperature(data.temperature)}`;
document.getElementById('content').innerHTML = `You are feeling ${data.feelings}`;
});
}
function formatTemperature(tempKelvin) {
const celcius = tempKelvin - 273.15;
const fahrenheit = celcius * (9/5) + 32;
return `${celcius.toFixed(0)} C/${fahrenheit.toFixed(1)} F`;
}
function postData(url = '', data = {}) {
return fetch(url, {
method: 'POST',
credentials: 'same-origin',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(data),
});
}