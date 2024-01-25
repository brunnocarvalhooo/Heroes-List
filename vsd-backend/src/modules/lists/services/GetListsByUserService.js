const listRepository = require('../repositories/list.repository')

class GetListsByUserService {
  async execute({ user_id }) {
    const lists = await listRepository.getListsByUserId(
      user_id
    )

    return lists
  }
}

module.exports = GetListsByUserService