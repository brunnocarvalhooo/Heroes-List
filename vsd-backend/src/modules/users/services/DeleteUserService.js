const AppError = require('../../../shared/AppError')

class DeleteUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ id, user_id }) {
    const user = await this.usersRepository.findById(id, user_id)
    if (!user) {
      throw new AppError('User not found')
    }

    const userDeleted = await this.usersRepository.deleteUser(id)

    return userDeleted
  }
}

module.exports = DeleteUserService