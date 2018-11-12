import React, { Component } from 'react';
import { Container, Header, Image, Button, Icon, Modal, Popup } from 'semantic-ui-react';
import ReviewForm from './ReviewForm'

export default class ReviewModal extends Component {
  state = {
    modalOpen: false,
    bookData:[]
  }

  componentDidMount=()=>{
    if(this.props.selectedBookData){
      this.setState({
        bookData: this.props.selectedBookData.volumeInfo
      })
    } else if(this.props.userBook) {
      this.setState({
        bookData: this.props.userBook
      })
    }
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })


  render(){
    return (

      <Modal
        trigger={<Popup trigger={<Button name="review" icon="write" onClick={this.handleOpen} />} content="review" />}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >

        <Modal.Header id="subhead"><h2 id="subhead">Review "{this.state.bookData.title}" by {this.state.bookData.author}:</h2></Modal.Header>
        <Modal.Content >
        <ReviewForm
          handleBookReview={this.props.handleBookReview}
          bookId={this.props.bookId}
          handleClose={this.handleClose}
        />
        </Modal.Content>
        </Modal>

      )

  }

}
