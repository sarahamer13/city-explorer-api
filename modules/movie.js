'use strict';

const axios = require('axios');
let cache = require('./cache.js');
require('dotenv').config();

function getMovies(request, response, next) {
  const city = request.query.citySearch;
  const key = 'movies-' + city;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
    response.status(200).send(cache[key].data);
  } else {
    console.log('Cache miss');
    axios.get(url)
      .then(apiResponse => apiResponse.data.results.map(movie => new Movies(movie)))
      .then(formattedData => {
        cache[key] = {
          data: formattedData,
          timestamp: Date.now()
        };
        response.status(200).send(formattedData);
      })
      .catch(err => next(err));
  }
}

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

module.exports = getMovies;


