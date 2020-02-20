import React, {useEffect} from 'react';
import { useParams } from "react-router-dom";

import Input from './../../shared/components/FormElements/Input'
import Button from './../../shared/components/FormElements/Button'
import Card from './../../shared/components/UIElements/Card'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "./../../shared/util/validators";
import { useForm } from "./../../shared/hooks/form-hook";
import './PlaceForm.css'

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
  const placeId = useParams().placeId

  const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId)

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    )
  }

  const [formState, inputHandler, setFormData] = useForm({
    title: {
      value:'',
      isValid: false
    },
    description: {
      value:'',
      isValid: false
    }
  }, false)

  useEffect(() => {
    if (identifiedPlace) {
      setFormData({
        title: {
          value: identifiedPlace.title,
          isValid: true
        },
        description: {
          value: identifiedPlace.description,
          isValid: true
        }
      }, true)
    }
  }, [setFormData, identifiedPlace])

  const placeUpdateSubmitHandler = event => {
    event.preventDefault()
    console.log(formState.inputs)
  }

  if (!formState.inputs.title.value) {
    return (
      <div className="center">
        <h2>Loading</h2>
      </div>
    )
  }
  
  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input 
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialIsValid={formState.inputs.title.isValid}
      />
      <Input 
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH()]}
        errorText="Please enter a valid description"
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialIsValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
    </form>
  );
}
