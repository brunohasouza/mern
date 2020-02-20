import React from 'react';
import { useParams } from "react-router-dom";
import PlaceList from './../components/PlaceList'

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5osy7lUHV_d8LQiThaaM-5IQVvZLqW7JtOzLWqo3enm2vWtlT&s',
    address: '20 W 34th St, New York, NY 10001, Estados Unidos',
    location: {
      lat: 40.7484405,
      lng: -73.9878531
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5osy7lUHV_d8LQiThaaM-5IQVvZLqW7JtOzLWqo3enm2vWtlT&s',
    address: '20 W 34th St, New York, NY 10001, Estados Unidos',
    location: {
      lat: 40.7484405,
      lng: -73.9878531
    },
    creator: 'u2'
  }
]

export default () => {
  const userId = useParams().userId
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)

  return (
    <PlaceList items={loadedPlaces} />
  );
}
