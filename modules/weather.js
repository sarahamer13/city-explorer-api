'use strict';

const axios = require ('axios');

function getWeather (request, response, next) {
  const city = request.query.searchQuery;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${city}&days=5&units=I`;

  axios.get (url)
    .then (response => response.data.data.map (weather => new Forecast(weather)))
    .then (formattedData => response.status (200).send(formattedData))
    .catch (err => next (err));

}

class Forecast {
  constructor(weatherObjects) {
    this.date = weatherObjects.valid_date;
    this.description = weatherObjects.weather.description;
    this.highTemp = weatherObjects.max_temp;
    this.lowTemp = weatherObjects.low_temp;
  }
}

module.exports = getWeather;
