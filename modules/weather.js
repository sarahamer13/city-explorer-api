'use strict';

const axios = require('axios');
let cache = require('./cache.js');
require('dotenv').config();

async function getWeather(latitude, longitude) {
  const key = 'weather-' + latitude + '-' + longitude;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=5&lat=${latitude}&lon=${longitude}`;
  console.log('Request URL:', url);

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
    console.log('Cached data:', cache[key].data);
    console.log('Cached timestamp:', cache[key].timestamp);
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(response => parseWeather(response.data));
  }

  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(day) {
    this.forecast = day.weather.description;
    this.time = day.valid_date;
  }
}

module.exports = getWeather;


module.exports = getWeather;
