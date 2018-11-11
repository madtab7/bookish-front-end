import React, { Component } from 'react';
import { Container, Header, Image, Button, Icon, Modal } from 'semantic-ui-react';
import EditReviewForm from './EditReviewForm'

export default class ReviewModal extends Component {
  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })


  render(){
    return (

      <Modal
        trigger={<Button onClick={this.handleOpen}>
          <h4 className="subhead">Update Review</h4>
          </Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >

        <Modal.Header id="subhead"><h2 id="subhead">Edit Review for "{this.props.book.title}" by {this.props.book.author}:</h2></Modal.Header>
        <Modal.Content >

        <EditReviewForm
          review={this.props.review}
          handleUpdatedReview={this.props.handleUpdatedReview}
        />
        </Modal.Content>
        </Modal>

      )

  }

}

// handleEditReview={this.props.handleEditReview}
