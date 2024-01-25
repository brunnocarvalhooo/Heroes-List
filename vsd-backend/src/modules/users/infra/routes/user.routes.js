const { Router } = require('express')

const multer = require('multer')

const {
  createUser,
  forgotPassword,
  resetPassword,
  listAllUsers,
  updateAvatar,
  listUser,
  deleteUser,
  updateUser,
} = require('../controllers/users.controller')

const {
  verifyPayloadForCreation,
  verifyEmailToForgotPassword,
  verifyPayloadForResetPassword,
} = require('../../middlewares/users.middleware')

const ensureAuthenticated = require('../../../../shared/middlewares/ensure-autenticated')

const uploadConfig = require('../../../../config/upload')

const userRouters = Router()

const upload = multer(uploadConfig)

userRouters.post('/', verifyPayloadForCreation(), createUser)

userRouters.get('/', listAllUsers)

userRouters.post(
  '/forgot', 
  verifyEmailToForgotPassword(), 
  forgotPassword
)

userRouters.patch(
  '/reset-password/:token', 
  verifyPayloadForResetPassword(), 
  resetPassword
)

userRouters.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  updateAvatar,
)

userRouters.put('/:userId', ensureAuthenticated, updateUser)

// userRouters.get('/:userId', ensureAuthenticated, listUser)

// userRouters.delete('/:userId', ensureAuthenticated, deleteUser)

module.exports = userRouters