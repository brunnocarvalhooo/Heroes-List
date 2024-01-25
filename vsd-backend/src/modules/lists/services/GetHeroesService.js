const marvelApi = require('../../../shared/providers/MarvelProvider')

class GetHeroesService {
  async execute(filter) {
    let convertedFilter = ''

    // if (filter.name) {
    //   convertedFilter += `name=${filter.name}`
    // }

    if (filter.nameStartsWith) {
      convertedFilter += `nameStartsWith=${filter.nameStartsWith}`
    }

    const result = await marvelApi.get(`characters?${convertedFilter}&limit=99&${process.env.MARVEL_PROPS}`)

    const heroesFiltered = result.data.data.results.map((results) => {
      return {
        heroId: results.id,
        heroName: results.name,
        heroDescription: results.description,
        heroThumbnail: results.thumbnail
      }
    }) 

    return heroesFiltered
  }
}

module.exports = GetHeroesService