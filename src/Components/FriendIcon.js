import React from 'react';
import { Container, Image } from 'semantic-ui-react'


const FriendIcon=({ friend })=>{
  return(
    <Container >
      <Image src={friend.avatarURL} avatar/>
      <span>{friend.username}</span>
    </Container>
  )
}
export default FriendIcon
