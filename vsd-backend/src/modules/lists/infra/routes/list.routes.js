const { Router } = require('express')

const multer = require('multer')

const {
  getHeroes,
  getHero,
  createList,
  getListsByUser,
  getListByUser,
  updateList,
  deleteList,
  updateImage,
} = require('../controllers/lists.controller')

const {
  verifyPayloadForCreation,
  verifyListIdInParams,
} = require('../../middlewares/list.middleware')

const uploadConfig = require('../../../../config/upload')

const listRouters = Router()

const upload = multer(uploadConfig)

listRouters.get('/all', getHeroes)

listRouters.get('/allHeroes', getHeroes)

listRouters.get('/hero/', getHero)

listRouters.post('/', verifyPayloadForCreation(), createList)

listRouters.get('/', getListsByUser)

listRouters.get('/:listId', getListByUser)

listRouters.put('/:listId', verifyListIdInParams(), updateList)

listRouters.delete('/:listId', verifyListIdInParams(), deleteList)

listRouters.patch(
  '/image',
  upload.single('image'),
  updateImage,
)

module.exports = listRouters
