const AppError = require('../../../shared/AppError')
const { generateHash } = require('../../../shared/utils/encrypt')

class UpdateUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(payload) {
    const { password } = payload

    if (!password || password === '') {
      delete payload.password
      delete payload.confirm_password
    } else {
      if (password !== payload.confirm_password) {
        throw new AppError('Password and password confirmation must be equal')
      }

      const hashedPassword = await generateHash(password)

      payload.password = hashedPassword

      delete payload.confirm_password
    }
    
    // const user = await this.usersRepository.getUserById(id)
    // if (!user) {
    //   throw new AppError('User not found')
    // }

    const userUpdated = await this.usersRepository.update(payload)

    delete userUpdated[0].password

    return userUpdated[0]
  }
}

module.exports = UpdateUserService