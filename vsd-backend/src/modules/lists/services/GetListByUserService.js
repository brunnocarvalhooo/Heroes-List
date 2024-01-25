const AppError = require('../../../shared/AppError')
const listRepository = require('../repositories/list.repository')

class GetListByUserService {
  async execute({ id, user_id }) {
    const list = await listRepository.getListById(id, user_id)
    if (!list) {
      throw new AppError('List not found')
    }

    return list
  }
}

module.exports = GetListByUserService