import React, { Component } from 'react';
import { Form, Button, Icon, Rating} from 'semantic-ui-react';

export default class ReviewForm extends Component {

  state = {
    title:"",
    review:"",
    rating:0
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

  handleReviewSubmit = (event) => {
    const reviewObj = this.state
    this.props.handleBookReview(reviewObj)
  }


  render(){
    return(

      <Form onSubmit={this.handleReviewSubmit}>
        Rating: <Rating icon="star" size="large" defaultRating={0} maxRating={5} name="rating" value={this.state.rating} onRate={this.handleRate}/>
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
