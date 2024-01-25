const { generateHash } = require('../../../shared/utils/encrypt')

const AppError = require('../../../shared/AppError')

const MailProvider = require('../../../shared/providers/MailProvider')

const { welcome } = require('../../../shared/providers/MailProvider/templates')

const { v4: uuid } = require('uuid')

class CreateUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(payload) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      payload.email,
    )
    if (userAlreadyExists) {
      throw new AppError('User already exists')
    }

    const { password } = payload 

    const hashedPassword = await generateHash(password)

    Object.assign(payload, { password: hashedPassword })

    const user = await this.usersRepository.create(payload)

    delete user.password

    const mailProvider = new MailProvider()

    await mailProvider.sendMail(
      user.email,
      'Bem vindo ao Desafio',
      welcome({ name: user.name, token: uuid() }),
    )

    return { user }
  }
}

module.exports = CreateUserService