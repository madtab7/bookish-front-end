import React, { Fragment, Component } from 'react';
import { Form, Button, Icon, Rating, Message} from 'semantic-ui-react';
import InternalAdapter from '../apis/InternalAdapter'

export default class ReviewForm extends Component {

  state = {
    title:"",
    review:"",
    rating:0,
    showDeleteMessage: false,
    showEditMessage: false
  }

  handleInputChange=(event, { name, value })=>{
    this.setState({
      [name]:value
    },()=>console.log(this.state))
  }

  handleRate=(event, { rating }) => {
    this.setState({
      rating
    },()=>console.log(this.state))
  }

  handleEditReview = (event) => {
    const reviewObj = this.state
    const reviewId = this.props.review.id
    this.props.handleUpdatedReview(reviewObj, reviewId)
    this.setState({
      showEditMessage: true
    })
  }

  handleDeleteReview=(event)=>{
    const reviewId = this.props.review.id
    InternalAdapter.deleteUserReview(reviewId)
    this.setState({
      showDeleteMessage: true
    })
  }


  render(){
    return(
      <Fragment>

      <Message floating positive
        hidden={!this.state.showDeleteMessage}
        visible={this.state.showDeleteMessage}>Your review has been deleted.
      </Message>

      <Message floating positive
        hidden={!this.state.showEditMessage}
        visible={this.state.showEditMessage}>Your review has been updated.
      </Message>

      <Form onSubmit={this.handleEditReview}>
        Rating:
        <Rating
          icon="star"
          size="large"
          defaultRating={this.props.review.rating} maxRating={5}
          name="rating"
          value={this.state.rating}
          onRate={this.handleRate}
        />
        <br/><br/>

        <Form.Input
          type="text"
          fluid label="Title"
          name="title"
          placeholder={this.props.review.title}
          value={this.state.title}
          onChange={this.handleInputChange}
        />

        <Form.Input
          type="text area"
          fluid label="Review"
          name="review"
          placeholder={this.props.review.content}
          value={this.state.review}
          onChange={this.handleInputChange}
        />

        <Button type="submit" style={{color:"black"}}>
          <h2 className="subhead">Submit</h2>
        </Button>

        <Button onClick={this.handleDeleteReview} style={{color:"black"}}>
          <h2 className="subhead">Delete</h2>
        </Button>

      </Form>

      </Fragment>

    )
  }

}
