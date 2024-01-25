const axios = require('axios');

const crypto = require('crypto');

// http://gateway.marvel.com/v1/public/comics?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150

class MarvelApi {
  //adiciona as chaves no .env pra nao ficar exposto na aplicaçao
  static API_KEY = 'f2a35e573163c63b393681e0b5c28dbf';
  static PRIVATE_KEY = '839e68e99313557321a8d290e546fb70382ab7e0';

  static getService() {
    const instance = axios.create({
      baseURL: 'http://gateway.marvel.com/v1/public/',
    });

    instance.interceptors.request.use(config => {
      const ts = Math.floor(new Date().getTime() / 1000).toString();
      const hash = crypto
        .createHash('md5')
        .update(`${ts}${MarvelApi.PRIVATE_KEY}${MarvelApi.API_KEY}`)
        .digest('hex');

      config.params = {
        ...config.params,
        apikey: MarvelApi.API_KEY,
        ts: ts,
        hash: hash,
      };

      return config;
    });

    return instance;
  }

  static async allCharacters(offset = 0) {
    const response = await MarvelApi.getService().get('characters', {
      params: { offset },
    });
    return response.data;
  }
}

(async (filter) => {
  try {
    const characters = await MarvelApi.allCharacters(filter);
    return characters.body
  } catch (error) {
    console.error('Error:', error.message);
  }
})()

module.exports = MarvelApi