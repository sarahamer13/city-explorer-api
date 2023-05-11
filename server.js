'use strict';


// We bring express
const express = require('express');

// We bring dotenv
require('dotenv').config();
// We bring cors
const cors = require('cors');

// We bring axios
const axios = require ('axios');

// Bringing our data
const weatherData = process.env.WEATHER_API_KEY;
const movieData = process.env.MOVIE_API_KEY;

// Initializing express
const app = express();

// Middleware to allow open access with cors
app.use(cors());

const PORT = process.env.PORT;

app.get('/', (request, response) => {
  response.status(200).send('Hey your default route is working');
});



app.get ('/weatherData',async (request, response, next) => {

  const { lat, lon } = request.query;
  console.log(`Latitude: ${lat}, Longitude: ${lon}`);
  try {

    const API = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;
    const cityData = await axios.get(API);

    const formattedData = cityData.data.data.map(dayForecast => {
      return {
        date: dayForecast.valid_date,
        description: dayForecast.weather.description,
        high_temp: dayForecast.high_temp,
        low_temp: dayForecast.low_temp
      };
    });

    response.status(200).send(formattedData);
  } catch (error) {
    next(error);
  }
});
// class Forecast {
//   constructor(weatherObjects) {
//     this.date = weatherObjects.date;
//     this.description = weatherObjects.day.condition.text;
//     this.highTemp = weatherObjects.day.max_temp;
//     this.lowTemp = weatherObjects.day.low_temp;
//   }
// }

app.use((error,request,response, next) => {
  console.error(error.message);
  response.status(500).send(error.message);
});

app.get ('/movies',async (request, response, next) => {

  const {citySearch} = request.query;

  try {
    const API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${citySearch}`;
    const movieData = await axios.get(API);


    const formattedData = movieData.data.results.map(movie => new Movies(movie));
    response.status(200).send(formattedData);

  } catch (error) {
    next(error);
  }
});

class Movies {
  constructor(obj) {
    this.title = obj.title;
    this.overview = obj.overview;
    this.images_url = obj.poster_path;
    this.average_votes = obj.vote_average;
    this.total_votes = obj.vote_count;
    this.popularity = obj.popularity;
    this.released_on = obj.release_date;
  }
}

app.use((error,request,response, next) => {
  console.error(error.message);
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));







