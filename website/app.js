/* Global Variables */
const base_url = "http://api.openweathermap.org/data/2.5/weather";
const country = "us";
const apy_key = "?&appid=62e179490a29bc17c56de5ec36a7e37d";
const my_server_url = "http://localhost:8000";

// Event listener - click

document.getElementById("generate").addEventListener("click", performAction);

/* Function called by event listener */
function performAction(e) {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  if (zip === "") {
    alert("Please enter zip code.");
    return true;
  }
  if (feelings === "") {
    alert("Please tell us how you are feeling today.");
    return true;
  }

  getWeather(zip, feelings);
}

/* Function to GET Web API Data*/
/* Function to POST data */
/* Function to GET Project Data */
const getWeather = async (zip, feelings) => {
  const res = fetch(`${base_url}${apy_key}&zip=${zip},${country}`)
    .then((response) => response.json())
    .then((data) => {
      // Add data
      const tempKelvin = data.main.temp;
      const d = new Date();
      const formattedDate =
        d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
      return postData(`${my_server_url}/addData`, {
        date: formattedDate,
        temperature: tempKelvin,
        feelings: feelings,
      });
    })
    .then(() => fetch(`${my_server_url}/all`))
    .then((response) => response.json())
    .then((allData) => {
      document.getElementById("date").innerHTML = `Today is ${
        allData[allData.length - 1].date
      }`;
      document.getElementById(
        "temp"
      ).innerHTML = `The temperature now is ${formatTemperature(
        allData[allData.length - 1].temperature
      )}`;
      document.getElementById("content").innerHTML = `You are feeling ${
        allData[allData.length - 1].feelings
      }`;
    });
};
function formatTemperature(tempKelvin) {
  const celcius = tempKelvin - 273.15;
  const fahrenheit = celcius * (9 / 5) + 32;
  return `${celcius.toFixed(0)} C/${fahrenheit.toFixed(1)} F`;
}
function postData(url = "", data = {}) {
  return fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
/* Function to add 'Most Recent Entry'*/
document.getElementById("generate").addEventListener("click", showTitle);
function showTitle() {
  document.getElementById("title").innerHTML = `Most Recent Entry`;
  document.getElementById("color").style.backgroundColor =
    "rgba(5, 10, 77, 0.454)";
}
