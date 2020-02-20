const express = require('express')
const { check } = require('express-validator')

const usersControllers = require('./../controllers/users-controller')

const router = express.Router()

router.get('/', usersControllers.getUsers)

router.post('/login', [
  check('name')
    .not()
    .isEmpty(),
  check('email')
    .normalizeEmail()
    .isEmail(),
  check('password')
    .isLength({ min: 6 })
],
usersControllers.login)

router.post('/signup', usersControllers.signup)

module.exports = router