const axios = require('axios')

const marvelApi = axios.create({
  baseURL: 'http://gateway.marvel.com/v1/public/',
});

module.exports = marvelApi