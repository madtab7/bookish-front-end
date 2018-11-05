import React, { Component } from 'react';
import UserPage from '../Components/UserPage'

export default class UserContainer extends Component{

  render(){

    return(
      <div>
        <UserPage currentUserData={this.props.currentUserData} />
      </div>
    )
  }
}
 
