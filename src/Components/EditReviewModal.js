import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import EditReviewForm from './EditReviewForm';

export default class ReviewModal extends Component {
  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })


  render(){
    return (

      <Modal
        trigger={<Button size="tiny" onClick={this.handleOpen}>
          <h4 className="subhead">Update Review</h4>
          </Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size="tiny"
      >

        <Modal.Header id="subhead"><h2 className="subhead">Edit Review for "{this.props.book.title}":</h2></Modal.Header>
        <Modal.Content >

        <EditReviewForm
          book={this.props.book}
          review={this.props.review}
          handleUpdatedReview={this.props.handleUpdatedReview}
          handleDeletedReview={this.props.handleDeletedReview}
          handleClose={this.handleClose}
        />
        </Modal.Content>
        </Modal>

      )

  }

}
