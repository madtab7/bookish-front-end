import React, { Component } from 'react';
import { Container, Header, Image, Button, Icon, Modal } from 'semantic-ui-react';
import ReviewForm from './ReviewForm'

export default class ReviewModal extends Component {
  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })


  render(){
    return (

      <Modal
        trigger={<Button animated onClick={this.handleOpen}>
          <Button.Content visible><h2 className="subhead">review</h2></Button.Content>
          <Button.Content hidden>
          <Icon name="write" />
          </Button.Content>
          </Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >

        <Modal.Header id="subhead"><h2 id="subhead">Review "{this.props.selectedBookData.volumeInfo.title}" by {this.props.selectedBookData.volumeInfo.authors[0]}:</h2></Modal.Header>
        <Modal.Content >
        <ReviewForm
        handleBookReview={this.props.handleBookReview}
        />
        </Modal.Content>
        </Modal>

      )

  }

}
