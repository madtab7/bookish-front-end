import React, { Component } from 'react';
import { Form, Button, Icon} from 'semantic-ui-react';

export default class ReviewForm extends Component {

  state = {
    title:"",
    content:"",
    rating:""
  }

  handleInputChange=(event, { name, value })=>{
    this.setState({
      [name]:value
    })
  }

  render(){
    return(

      <Form>

        <Form.Input
          type="title"
          fluid label="Title"
          name="title"
          value={this.state.title}
          onChange={this.handleInputChange}
        />

        <Form.Input
          type="content"
          fluid label="Review"
          name="title"
          value={this.state.title}
          onChange={this.handleInputChange}
        />

      </Form>

    )
  }

}
