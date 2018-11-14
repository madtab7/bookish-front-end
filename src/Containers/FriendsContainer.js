import React, { Component } from 'react';
import CommunityPage from '../Components/CommunityPage';
import InternalAdapter from '../apis/InternalAdapter';

export default class FriendsContainer extends Component{

  handleAddFriendClick=(event)=>{
    let friend_id = parseInt(event.target.id)
    let user_id = this.props.currentUserData.id
    InternalAdapter.createFriendship(user_id, friend_id)
  }

  render(){
    return(
      <CommunityPage
        handleAddFriendClick={this.handleAddFriendClick}
      />
    )
  }
}
