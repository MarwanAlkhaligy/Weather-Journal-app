// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// localhost port
const port = 3000;

/* Dependencies */
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
const bodyParse = require('body-parser');
app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const server = app.listen(port, listen);

// Callback to debug
function listen() {
  console.log(`Example app listening at http://localhost:${port}`); 
}

// Callback function to complete GET '/all'
app.get('/all', sendData);

// Initialize all route with a callback function
function sendData(req, res) {
  console.log("Data from Server" + projectData);
  res.send(projectData);
}

// Post Route
app.post('/addData', addData);

// Post Route callback function
function addData(req, res) {
  const data =  req.body;

  console.log('server side data ', data)

  projectData['date'] = data.date;
  projectData['temp'] = data.temp;
  projectData['content'] = data.content;
  
  res.send(projectData);
}