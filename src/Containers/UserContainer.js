import React, { Component } from 'react';
import UserPage from '../Components/UserPage'
import { connect } from 'react-redux'
import withAuth from '../HOCs/withAuth'
import InternalAdapter from '../apis/InternalAdapter'
import { Button, Message} from 'semantic-ui-react';


class UserContainer extends Component {

  state = {
    showDeleteMessage: false,
    showEditMessage: false,
    showReccMessage: false
  }

  handleUpdatedReview=(reviewObj, reviewId)=>{
    InternalAdapter.updateUserReview(reviewObj, reviewId)
    this.setState({
      showEditMessage: true
    })
  }

  handleDeletedReview=(event)=>{
    this.setState({
      showDeleteMessage: true
    })
  }

  handleBookReview=(reviewObj,bookId)=>{
    const userId = this.props.id
    console.log(reviewObj, userId, bookId)
    InternalAdapter.createReviewFromReadBook(userId, bookId, reviewObj)
  }

  handleRecommendUserBook=(event, bookId)=>{
    const userId = this.props.id
    const friendId = parseInt(event.target.id)
    InternalAdapter.createRecommendationFromReadBook(userId, bookId, friendId)
    this.setState({
      showReccMessage: true
    })
  }

  render(){

    return(
      <div>

      <Message floating positive
        hidden={!this.state.showDeleteMessage}
        visible={this.state.showDeleteMessage}>Your review has been deleted.
      </Message>

      <Message floating positive
        hidden={!this.state.showEditMessage}
        visible={this.state.showEditMessage}>Your review has been updated.
      </Message>

      <Message floating positive
        hidden={!this.state.showReccMessage}
        visible={this.state.showReccMessage}>Your recommendation has been sent.
      </Message>

      <UserPage
        id={this.props.id}
        avatarURL={this.props.avatarURL}
        username={this.props.username}
        handleUpdatedReview={this.handleUpdatedReview}
        handleBookReview={this.handleBookReview}
        handleDeletedReview={this.handleDeletedReview}
        handleRecommendUserBook={this.handleRecommendUserBook}
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
