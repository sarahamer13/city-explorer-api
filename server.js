'use strict';


// We bring express
const express = require('express');

// We bring dotenv
require('dotenv').config();
// We bring cors
const cors = require('cors');


const getWeather = require ('./modules/weather');
const getMovies = require ('./modules/movie');


// Initializing express
const app = express();

// Middleware to allow open access with cors
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.status(200).send('Hey your default route is working');
});

app.get('/weather',(request, response) => {
  const { lat, lon} = request.query;
  getWeather (lat,lon)
    .then (summaries => response.status (200).send (summaries))
    .catch(error => {
      console.log(error);
      response.status(500).send('Sorry, something went wrong!'+ error.message);
    });
});
app.get('/movies',(request,response)=> {
  const location = request.query.searchQuery;
  getMovies(location)
    .then(movieList => response.status(200).send(movieList))
    .catch(error => {
      console.error(error);
      response.status(500).send('Uh Oh! something went wrong!'+ error.message);
    });
});

app.get('*', (request, response) => {
  response.send('The route was not found. Error 404');
});


app.listen(PORT, () => console.log(`listening on ${PORT}`));








