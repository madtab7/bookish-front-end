import React, { Component } from 'react';
import UserPage from '../Components/UserPage'
import { connect } from 'react-redux'
import withAuth from '../HOCs/withAuth'
import InternalAdapter from '../apis/InternalAdapter'

const handleUpdatedReview=(reviewObj, reviewId)=>{
  InternalAdapter.updateUserReview(reviewObj, reviewId)
}

const UserContainer = ({ id, avatarURL, username }) => {
  console.log(id, avatarURL, username)
  return(
    <div>
      <UserPage
        id={id}
        avatarURL={avatarURL}
        username={username}
        handleUpdatedReview={handleUpdatedReview}
      />
    </div>
  )
}

const mapStateToProps = ({ usersReducer: { user: { id, avatarURL, username } } }) => ({
  id,
  avatarURL,
  username
})

export default withAuth(connect(mapStateToProps)(UserContainer))
