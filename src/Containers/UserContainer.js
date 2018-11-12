import React, { Component } from 'react';
import UserPage from '../Components/UserPage'
import { connect } from 'react-redux'
import withAuth from '../HOCs/withAuth'
import InternalAdapter from '../apis/InternalAdapter'


class UserContainer extends Component {

  handleUpdatedReview=(reviewObj, reviewId)=>{
    InternalAdapter.updateUserReview(reviewObj, reviewId)
  }

  handleBookReview=(reviewObj,bookId)=>{
    const userId = this.props.id
    console.log(reviewObj, userId, bookId)
    InternalAdapter.createReviewFromReadBook(userId, bookId, reviewObj)
  }

  render(){

    return(
      <div>
      <UserPage
      id={this.props.id}
      avatarURL={this.props.avatarURL}
      username={this.props.username}
      handleUpdatedReview={this.handleUpdatedReview}
      handleBookReview={this.handleBookReview}
      />
      </div>
    )
  }
}

const mapStateToProps = ({ usersReducer: { user: { id, avatarURL, username } } }) => ({
  id,
  avatarURL,
  username
})

export default withAuth(connect(mapStateToProps)(UserContainer))
