/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() +1) +'/'+ d.getDate()+'/'+ d.getFullYear();

//url of the OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Personal API Key for OpenWeatherMap API
const apiKey = ',&appid=f48271c9cc38a6797f02822a089781c4&units=metric';

// error message for wrong zipcode
const errorLabel = document.getElementById('error-message');

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
  const cont = document.getElementById('feelings').value;
  const zipCode = document.getElementById('zip').value;
  getData(baseURL, zipCode, apiKey)
  .then((data) => {
    
    if(data) {
      postData('/addData', {date: newDate,  temp: data.main.temp, content: cont});//
      updataUI();
      errorLabel.innerHTML = "";
    }else{
      errorLabel.innerHTML = "Wrong zipcode";
    }
  });
}

/* Function to GET Web API Data*/
const getData = async (baseURL, zipCode, apikey) => {
  try {
    const res = await fetch(baseURL + zipCode + apikey);
    const data = await res.json();
    
    // check for error in the data
    if(data.cod != 200)
      throw `${data.message}`;
      
    console.log(data);
    return data;
  }catch(error){
    console.log('error', error);
  }
};

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    }catch(error) {
    console.log("error", error);
    // appropriately handle the error
    }
};

/* Function to Update UI  */
const updataUI = async () => {
    const response = await fetch('/all');
    try {
      const allData = await response.json();
      console.log('Updata Ui \n' + allData);
      document.getElementById('date').innerHTML = `Date: ${allData.date}`;
      document.getElementById('temp').innerHTML = `Temperature: ${Math.round(allData.temp)} <sup>o</sup> C`;
      document.getElementById('content').innerHTML = `I feel: ${allData.content}`;
    } catch(error) {
      console.log('error UI error', error)
    }
  
  }



