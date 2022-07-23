const express  = require('express')
const router = express.Router()
const usersController = require('../controllers/usersControllers')

router.post('/signin', usersController.signin)
router.post('/signup', usersController.signup)

module.exports = router