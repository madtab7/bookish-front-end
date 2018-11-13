import React, { Fragment, Component } from 'react';
import { Form, Button, Rating } from 'semantic-ui-react';
import InternalAdapter from '../apis/InternalAdapter'

export default class ReviewForm extends Component {

  state = {
    title:"",
    review:"",
    rating:0
  }

  handleInputChange=(event, { name, value })=>{
    this.setState({
      [name]:value
    })
  }

  handleRate=(event, { rating }) => {
    this.setState({
      rating
    })
  }

  handleEditReview = (event) => {
    const reviewObj = this.state
    const reviewId = this.props.review.id
    this.props.handleUpdatedReview(reviewObj, reviewId)
  }

  handleDeleteReview=(event)=>{
    const reviewId = this.props.review.id
    InternalAdapter.deleteUserReview(reviewId)
    this.props.handleDeletedReview(event)
  }


  render(){
    return(
      <Fragment>



      <Form
        onSubmit={(event)=>{
          this.handleEditReview(event);
          this.props.handleClose()
        }}
      >
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

        <Button
          type="button"
          onClick={(event)=>{
            this.handleDeleteReview(event);
            this.props.handleClose()
          }}
          style={{color:"black"}}
        >
          <h2 className="subhead">Delete</h2>
        </Button>

      </Form>

      </Fragment>

    )
  }

}
