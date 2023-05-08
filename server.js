'use strict';

// We bring dotenv
require('dotenv').config();

// We bring express
const express = require('express');

// We bring cors
const cors = require('cors');

// Bringing our data
// const weatherData = require('./data/weather.json');

// Initializing express
const app = express();

// Middleware to allow open access with cors
app.use(cors());

const PORT = process.env.PORT;

app.get('/', (request, response) => {
  response.status(200).send('Hey your default route is working');
});

// http://localhost:3001/weatherData
// app.get('/weather', (request, response, next) => {
//   try {
//     const searchQuery = request.query.searchQuery;
//     console.log(searchQuery);

//     // Find city
//     const cityData = weatherData.find(weather => weather.city_name.toLowerCase() === searchQuery.toLowerCase());
//     console.log(cityData);

//     const formattedData = cityData.data.map(dayForecast => new Forecast(dayForecast));
//     response.status(200).send(formattedData);

//   } catch (error) {
//     next(error);
//   }
// });

// class Forecast {
//   constructor(weatherObjects) {
//     this.date = weatherObjects.valid_date;
//     this.description = weatherObjects.weather.description;
//     this.highTemp = weatherObjects.max_temp;
//     this.lowTemp = weatherObjects.low_temp;
//   }
// }

app.get('*', (request, response) => {
  response.status(404).send('The route was not found. Error 404');
});

app.use((error,request,response, next) => {
  console.error(error.message);
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
