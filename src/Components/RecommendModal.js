import React, { Component } from 'react';
import { Image, Button, Modal, Popup, List } from 'semantic-ui-react';

export default class RecommendModal extends Component {
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
        trigger={<Popup trigger={<Button name="recommend" icon="thumbs up outline" onClick={this.handleOpen} />} content="recommend" />}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size="mini"
      >

        <Modal.Header><h2 className="subhead">Recommend "{this.state.bookData.title}" by {this.state.bookData.author} to:</h2></Modal.Header>
        <Modal.Content >
          <List>
            {this.props.userFriends.map((friend)=> {
              return(
                <List.Item
                  id={friend.friend.id}
                  key={friend.friend.id}
                  onClick={(event)=>{
                    this.props.handleRecommendUserBook(event, this.state.bookData.id);
                    this.handleClose()
                  }}
                >
                  <Image avatar id={friend.friend.id} src={friend.friend.avatarURL} />
                  <List.Content id={friend.friend.id} style={{width:"70%"}}>
                    <List.Header id={friend.friend.id} className="subhead"> {friend.friend.username} </List.Header>
                  </List.Content>
                </List.Item>
              )
            })}
          </List>

        </Modal.Content>
        </Modal>

      )

  }

}
