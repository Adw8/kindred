import React from 'react'
import { useParams } from 'react-router-dom';

const FriendDetails = () => {
  const { id } = useParams();
  return (
    <div>View details for friend {id}</div>
  )
}

export default FriendDetails;
