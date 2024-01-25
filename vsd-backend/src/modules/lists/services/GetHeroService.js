const marvelApi = require('../../../shared/providers/MarvelProvider')

class GetHeroService {
  async execute(filter) {
    let convertedFilter = ''

    if (filter.heroId) {
      convertedFilter += `${filter.heroId} `
    }

    const result = await marvelApi.get(`characters/${filter.heroId}?${process.env.MARVEL_PROPS}`)

    const heroFiltered = result.data.data.results[0]

    return heroFiltered
  }
}


module.exports = GetHeroService