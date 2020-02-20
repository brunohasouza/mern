const uuid = require('uuid/v4')
const { validationResult } = require('express-validator')

const HttpError = require('./../models/http-error')

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Bruno Souza',
    email: 'bruno@email.com',
    password: '123123'
  }
]

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS })
}

const signup = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    console.log(errors)
    throw new HttpError('Invalid inputs passed, please check your data', 422)
  }
  const { name, email, password } = req.body

  const hasUser = DUMMY_USERS.find(u => u.email === email)

  if (hasUser) {
    throw new HttpError('Could not create user, email already exists.', 422)
  }

  const createUser = {
    id: uuid(),
    name,
    email,
    password
  }

  DUMMY_USERS.push(createUser)

  res.status(201).json({user: createUser})
}

const login = (req, res, next) => {
  const { email, password } = req.body

  const identifierUser = DUMMY_USERS.find(u => u.email === email)
  if (!identifierUser || identifierUser.password !== password) {
    throw new HttpError('Could not identify user, credentials seem to be wrong', 401)
  }

  res.json({ message: 'Logged in!' })
}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login