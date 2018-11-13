import React, { Component } from 'react';
import { Button, Modal, Popup } from 'semantic-ui-react';
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
        size="tiny"
      >

        <Modal.Header><h2 className="subhead">Review "{this.state.bookData.title}":</h2></Modal.Header>
        <Modal.Content >
        <ReviewForm
          handleBookReview={this.props.handleBookReview}
          bookId={this.props.bookId}
          bookData={this.state.bookData}
          handleClose={this.handleClose}
        />
        </Modal.Content>
        </Modal>

      )

  }

}
