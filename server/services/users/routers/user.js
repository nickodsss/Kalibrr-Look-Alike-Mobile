const express = require('express')
const router = express.Router()

const UserController = require('../controllers/userController')

router.post('/users', UserController.createUser)
router.get('/users', UserController.findAllUser)
router.get('/users/:id', UserController.findUserById)
router.delete('/users/:id', UserController.deleteUser)


module.exports = router