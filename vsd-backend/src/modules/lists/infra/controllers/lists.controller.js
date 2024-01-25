const api = require('../../../../shared/providers/MarvelProvider')

const GetHeroesService = require('../../services/GetHeroesService')
const GetHeroService = require('../../services/GetHeroService')
const CreateListService = require('../../services/CreateListService')
const GetListsByUserService = require('../../services/GetListsByUserService')
const GetListByUserService = require('../../services/GetListByUserService')
const UpdateListService = require('../../services/UpdateListService')
const DeleteListService = require('../../services/DeleteListService')

const listRepository = require('../../repositories/list.repository')
const UpdateImageService = require('../../services/UpdateImageService')

module.exports = {
  async getHeroes(request, response) {
    const { nameStartsWith } = request.query

    const getHeroesService = new GetHeroesService(api)

    const heroes = await getHeroesService.execute({ nameStartsWith })

    return response.json({ data: heroes })
  },

  async getHero(request, response) {
    const getHero = new GetHeroService(api)

    const { heroId } = request.query

    const filter = { heroId }

    const hero = await getHero.execute(filter)

    return response.json({ data: hero })
  },

  async createList(request, response) {
    const { title, description } = request.body
    const { id } = request.user

    const createListService = new CreateListService(api)

    const listCreated = await createListService.execute({
      title,
      description,
      user_id: id
    })

    return response.json({ data: listCreated })
  },

  async getListsByUser(request, response) {
    const { id } = request.user

    const getListsByUserService = new GetListsByUserService(api)

    const lists = await getListsByUserService.execute({ user_id: id })

    return response.json({ data: lists})
  },

  async getListByUser(request, response) {
    const { listId } = request.params
    const { id } = request.user

    const getListByUserService = new GetListByUserService(api)

    const list = await getListByUserService.execute({
      id: listId,
      user_id: id,
    })

    return response.json({ data: list })
  },

  async updateList(request, response) {
    const { title, description, heroes, image } = request.body
    const { listId } = request.params
    const { id } = request.user

    const updateListService = new UpdateListService(api)

    const listUpdated = await updateListService.execute({
      id: listId,
      title,
      description,
      heroes,
      user_id: id,
      image
    })

    return response.json({ data: listUpdated })
  },

  async deleteList(request, response) {
    const { listId } = request.params
    const { id } = request.user

    const deleteListService = new DeleteListService(api)

    await deleteListService.execute({ id: listId, user_id: id })

    return response.json({ message: 'List deleted' })
  },

  async updateImage(request, response) {
    const { file, user } = request

    const updateImage = new UpdateImageService(usersRepository)

    const listUpdated = await updateImage.execute({
      file,
      user,
    })

    return response.json({ data: listUpdated })
  },
}