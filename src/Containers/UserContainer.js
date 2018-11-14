import React, { Component } from 'react';
import UserPage from '../Components/UserPage'
import { connect } from 'react-redux'
import withAuth from '../HOCs/withAuth'
import InternalAdapter from '../apis/InternalAdapter'
import { Message } from 'semantic-ui-react';


class UserContainer extends Component {

  render(){

    return(
      <div>


      <UserPage
        id={this.props.id}
        avatarURL={this.props.avatarURL}
        username={this.props.username}
        full_name={this.props.full_name}
      />
      </div>
    )
  }
}

const mapStateToProps = ({ usersReducer: { user: { id, avatarURL, username, full_name } } }) => ({
  id,
  avatarURL,
  username,
  full_name
})

export default withAuth(connect(mapStateToProps)(UserContainer))
