import React from 'react';

import UsersList from './../components/UsersList'

const User = () => {
  const USERS = [
    { 
      id: 1, 
      name: 'Bruno Henrique', 
      image: 'https://mars.nasa.gov/people/images/profile/1x1/rfrancis-22826-profile-hi_F9C4E5F6-5645-4186-9A35995CDA924E4A.jpg', 
      places: 3 
    }
  ]

  return (
    <UsersList items={USERS} />
  );
}

export default User;