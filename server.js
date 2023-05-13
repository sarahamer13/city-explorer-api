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

const PORT = process.env.PORT;

app.get('/', (request, response) => {
  response.status(200).send('Hey your default route is working');
});

app.use((err, request, response, next) => {
  response.status(500).send(err);
  next();
});

app.get('/weather', getWeather);
app.get('/movies', getMovies);

app.listen(PORT, () => console.log(`listening on ${PORT}`));








