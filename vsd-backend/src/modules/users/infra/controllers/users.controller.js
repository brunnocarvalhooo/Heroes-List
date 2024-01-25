const usersRepository = require('../../repositories/users.repository')

const MailProvider = require('../../../../shared/providers/MailProvider')

const CreateUserService = require('../../services/CreateUserService')
const ListAllUsersService = require('../../services/ListAllUsersService')
const ForgotPasswordService = require('../../services/ForgotPasswordService')
const ResetUserPasswordService = require('../../services/ResetUserPasswordService')
const UpdateAvatarService = require('../../services/UpdateAvatarSercice')
const ListUserService = require('../../services/ListUserService')
const DeleteUserService = require('../../services/DeleteUserService')
const UpdateUserService = require('../../services/UpdateUserService')

module.exports = {
  async createUser(request, response) {
    const { name, email, password } = request.body

    const createUser = new CreateUserService(usersRepository)

    const user = await createUser.execute({
      name,
      email, 
      password,
    })

    return response.json({ data: user })
  },

  async updateUser(request, response) {
    const updateUser = new UpdateUserService(usersRepository)

    const { userId } = request.params

    const user = await updateUser.execute({
      id: userId,
      ...request.body,
    })

    return response.json({ data: user })
  },

  async deleteUser(request, response) {
    const { userId } = request.params
    const { id } = request.user

    const deleteUserService = new DeleteUserService(usersRepository)

    await deleteUserService.execute({ id: userId, user_id: id })

    return response.json({ message: 'User deleted' })
  },

  async listUser(request, response) {
    const { userId } = request.params
    const { id } = request.user

    const listUserService = new ListUserService(usersRepository)

    const user = await listUserService.execute({
      id: userId,
      user_id: id,
    })

    return response.json({ data: user })
  },

  async listAllUsers(request, response) {
    const listAllUsers = new ListAllUsersService(usersRepository)

    const users = await listAllUsers.execute()
    return response.json({ data: users })
  },

  async updateAvatar(request, response) {
    const { file, user } = request

    const updateAvatar = new UpdateAvatarService(usersRepository)

    const userUpdated = await updateAvatar.execute({
      file,
      user,
    })

    return response.json({ data: userUpdated })
  },

  async forgotPassword(request, reponse) {
    const mailProvider = new MailProvider()

    const forgotPassword = new ForgotPasswordService(
      usersRepository, mailProvider,
    )

    const { email } = request.body

    await forgotPassword.execute({ email })

    return reponse.status(203).send()
  },

  async resetPassword(request, response) {
    const { token } = request.params
    const { password } = request.body

    const resetPassword = new ResetUserPasswordService(usersRepository)

    const updatedPassword = await resetPassword.execute({ token, password })

    return response.json({ data: updatedPassword })
  },
}