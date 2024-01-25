const AppError = require('../../../shared/AppError')

const listRepository = require('../repositories/list.repository')

class DeleteListService {
  async execute({ id, user_id }) {
    const list = await listRepository.getListById(id, user_id)
    if (!list) {
      throw new AppError('List not found')
    }

    const listDeleted = await listRepository.deleteList(id)

    return listDeleted
  }
}

module.exports = DeleteListService