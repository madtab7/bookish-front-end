import React, { Component } from 'react';
import { Form, Button, Rating} from 'semantic-ui-react';

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

  handleReviewSubmit = (event) => {
    const reviewObj = this.state
    if(this.props.bookId){
      const bookId = this.props.bookId
      this.props.handleBookReview(reviewObj, bookId)
    } else {
      this.props.handleBookReview(reviewObj)
    }
  }


  render(){
    return(

      <Form onSubmit={(event)=>{
        this.handleReviewSubmit(event);
        this.props.handleClose()
      }}>
        Rating:
        <Rating
          icon="star"
          size="large"
          defaultRating={0} maxRating={5}
          name="rating"
          value={this.state.rating}
          onRate={this.handleRate}
        />
        <br/><br/>

        <Form.Input
          type="text"
          fluid label="Title"
          name="title"
          value={this.state.title}
          onChange={this.handleInputChange}
        />

        <Form.Input
          type="text area"
          fluid label="Review"
          name="review"
          value={this.state.review}
          onChange={this.handleInputChange}
        />

        <Button type="submit" style={{color:"black"}}>
          <h2 className="subhead">Submit</h2>
        </Button>

      </Form>

    )
  }

}
