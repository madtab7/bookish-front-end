import React, { Component } from 'react';
import InternalAdapter from '../apis/InternalAdapter'
import { Image, Icon, Container, Grid, Message } from 'semantic-ui-react'

export default class CommunityPage extends Component{

  state = {
    allUsers:[],
    showConfirmMessage: false
  }

  componentDidMount=()=>{
    InternalAdapter.getAllUsers()
    .then(allUsers => {
      this.setState({
        allUsers
      })
    })
  }

  handleAddFriend=()=>{
    this.setState({
      showConfirmMessage: true
    })
  }

  // ONLY SHOW ADD FRIEND ICON IF THEY AREN"T FRIENDS

  render(){

    return(
      <Container>
      <Message floating positive
      hidden={!this.state.showConfirmMessage}
      visible={this.state.showConfirmMessage}><h2 className="subhead">Friend added!</h2>
      </Message>

      <Grid itemsPerRow={5}>

      <Grid.Row>
        {this.state.allUsers.map((user)=>{
          return(
            <div style={{textAlign:"center", padding:"5%"}}>
              <Image src={user.avatarURL} avatar/>
              <span>{user.username}</span>
              <br/>
              <span>{user.full_name}</span>
              <br/>
              <Icon id={user.id} name="add user"
                onClick={(event)=>{
                  this.props.handleAddFriendClick(event);
                  this.handleAddFriend()
              }} />
              <br/>
              <br/>
            </div>
          )
        })}
        </Grid.Row>
        </Grid>
      </Container>
    )

  }

}
