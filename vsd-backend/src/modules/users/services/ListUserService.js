class ListUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ id, user_id }) {
    const user = await this.usersRepository.findById(id, user_id)

    return user
  }
}

module.exports = ListUserService