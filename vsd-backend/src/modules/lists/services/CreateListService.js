const listRepository = require('../repositories/list.repository')

class CreateListService {
  async execute({ title, description, user_id }) {
    const list = await listRepository.createList({
      title,
      description,
      user_id,
    })


    return list
  }
}

module.exports = CreateListService