import React, { Component } from 'react';
import InternalAdapter from '../apis/InternalAdapter'
import { Image, Icon, Container, Grid } from 'semantic-ui-react'

export default class CommunityPage extends Component{

  state = {
    allUsers:[]
  }

  componentDidMount=()=>{
    InternalAdapter.getAllUsers()
    .then(allUsers => {
      this.setState({
        allUsers
      })
    })
  }

  render(){

    return(
      <Container>
        {this.state.allUsers.map((user)=>{
          return(
            <Grid columns={2}>
            <div style={{textAlign:"center", paddingTop:"5%"}}>
              <Image src={user.avatarURL} avatar/>
              <span>{user.username}</span>
              <br/>
              <span>{user.full_name}</span>
              <br/>
              <Icon name="add user" />
              <br/>
              <br/>
              <br/>
            </div>
            </Grid>
          )
        })}
      </Container>
    )

  }

}
