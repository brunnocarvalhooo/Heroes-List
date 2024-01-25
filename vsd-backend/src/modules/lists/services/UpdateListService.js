const AppError = require('../../../shared/AppError')

const listRepository = require('../repositories/list.repository')

class UpdateListService {
  async execute({ id, title, description, heroes, user_id , image}) {
    const list = await listRepository.getListById(id, user_id)
    if (!list) {
      throw new AppError('List not found')
    }

    const listUpdated = await listRepository.updateList({
      id,
      title,
      description,
      heroes,
      // ...(heroes.length > 0 && { heroes: JSON.stringify(heroes) }),
      user_id,
      image,
    })

    return listUpdated
  }
}

module.exports = UpdateListService