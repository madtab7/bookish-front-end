import React from 'react';
import { Container, Image } from 'semantic-ui-react'


const FriendIcon=({ friend })=>{
  return(
    <Container style={{paddingTop:"5%"}} id={friend.id}>
      <Image id={friend.id} src={friend.avatarURL} avatar/>
      <span id={friend.id} style={{fontSize:"0.8em"}}>{friend.username}</span>
      <br/>
    </Container>
  )
}
export default FriendIcon
