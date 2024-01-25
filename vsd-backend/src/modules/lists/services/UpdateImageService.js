const listRepository = require('../repositories/list.repository')

class UpdateImageService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(payload) {
    const { file, user } = payload

    if (existsUser.avatar) {
      const fileCompletePath = path.join(directory, existsUser.avatar)

      const fileExists = fs.existsSync(fileCompletePath)
      if (fileExists) {
        fs.unlinkSync(fileCompletePath)
      }
    }

    const updatedImage = await this.listRepository.update({
      id: user.id,
      image: file.filename,
    })

    delete updatedImage[0].password

    return updatedImage[0]
  }
}

module.exports = UpdateImageService