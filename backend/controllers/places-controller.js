const uuid = require('uuid/v4')
const { validationResult } = require('express-validator')
const HttpError = require('./../models/http-error')
const getCoordsForAddress = require('./../util/location')
const Place = require('./../models/place')

let DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famouse sky scrapers in the world!',
    location: {
      lat: 40.7484474,
      lng: -73.9871516
    },
    address: '20 W 34th St, New Yout, NY 10001',
    creator: 'u1'
  }
]

const getPlaceById = (req, res, next) => {
  const placeId = req.params.placeId
  const place = DUMMY_PLACES.find(p => p.id === placeId)

  if (!place) {
    throw new HttpError('Could not find a place for the provided id.', 404)
  }

  res.json({ place })
}

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.userId
  const places = DUMMY_PLACES.filter(place => place.creator === userId)

  if (places.length === 0) {
    next(new HttpError('Could not find a place for the provided user id.', 404))
  }

  res.json({ places })
}

const createPlace = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    next(new HttpError('Invalid inputs passed, please check your data', 422))
  }

  const { title, description, address, creator } = req.body
  let coordinates

  try {
    coordinates = await getCoordsForAddress(address)  
  } catch (error) {
    next(error)
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image: 'https://readyrefrigeration.ca/sites/default/files/styles/headshot/adaptive-image/public/nobody.jpg',
    creator
  })

  try {
    await createdPlace.save()    
  } catch (error) {
    const e = new HttpError(
      'Creating place failed, please try again.',
      500
    )
    return next(e)
  }
  res.status(201).json({ place: createdPlace })
}

const updatePlace = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    console.log(errors)
    throw new HttpError('Invalid inputs passed, please check your data', 422)
  }

  const { title, description } = req.body
  const placeId = req.params.placeId

  const updatedPlace = { ...DUMMY_PLACES.find(p > p.id === placeId) }
  const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId)

  updatedPlace.title = title || DUMMY_PLACES[placeIndex].title
  updatedPlace.description = description || DUMMY_PLACES[placeIndex].description

  DUMMY_PLACES[placeIndex] = updatedPlace

  res.status(200).json({ place: updatedPlace })

}

const deletePlace = (req, res, next) => {
  const placeId = req.params.placeId
  DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId)
  res.status(200).json({ message: 'Deleted place.' })
}

exports.getPlaceById = getPlaceById
exports.getPlacesByUserId = getPlacesByUserId
exports.createPlace = createPlace
exports.deletePlace = deletePlace
exports.updatePlace = updatePlace