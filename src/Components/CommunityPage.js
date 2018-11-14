import React, { Component } from 'react';
import InternalAdapter from '../apis/InternalAdapter'
import { Image, Icon, Container, Grid, Message, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

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
    this.timeout = setTimeout(()=>{
      this.setState({showConfirmMessage: false})
    }, 2500)
  }

  // ONLY SHOW ADD FRIEND ICON IF THEY AREN"T FRIENDS

  render(){

    return(
      <Container>
      <Message floating positive
      hidden={!this.state.showConfirmMessage}
      visible={this.state.showConfirmMessage}><h2 className="subhead">Friend added!</h2>
      </Message>

      <br/>

      <Button size="large" name="profile" style={{color:"black"}}>
        <Link to="/profile" style={{color:"black"}}>
          <h1 className="subhead"><Icon name="chevron left" />back to profile</h1>
        </Link>
      </Button>

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
