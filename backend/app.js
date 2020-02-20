const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const placesRoutes = require('./routes/places-routes')
const userRoutes = require('./routes/users-routes')
const HttpError = require('./models/http-error')

const app = express()

app.use(bodyParser.json())

app.use('/api/places', placesRoutes)
app.use('/api/users', userRoutes)

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route', 404)
  throw error
})

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error)
  }

  res
    .status(error.code || 500)
    .json({
      message: error.message || 'An unknown error occurred!'
    })
})

mongoose.connect('mongodb+srv://bruno:bbY9lXnhFlIHkBqc@cluster0-t6iqb.mongodb.net/places?retryWrites=true&w=majority')
  .then(() => {
    app.listen(5000)
  })
  .catch((err) => {
    console.error(err)
  })