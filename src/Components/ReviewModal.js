import React, { Component } from 'react';
import { Container, Header, Image, Button, Icon, Modal } from 'semantic-ui-react';
import ReviewForm from './ReviewForm'

const ReviewModal = (props) => {
  return (

    <Modal trigger={<Button animated >
      <Button.Content visible><h2 className="subhead">review</h2></Button.Content>
      <Button.Content hidden>
        <Icon name="write" />
      </Button.Content>
      </Button>}>

      <Modal.Header id="subhead"><h2 id="subhead">Review "{props.selectedBookData.volumeInfo.title}" by {props.selectedBookData.volumeInfo.authors[0]}:</h2></Modal.Header>
      <Modal.Content >
        <ReviewForm />
      </Modal.Content>
      </Modal>

  )

}
export default ReviewModal
