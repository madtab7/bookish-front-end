import React, { Component } from 'react';
import { Container, Header, Grid, Button, Icon, Message, Popup } from 'semantic-ui-react';
import FriendIcon from './FriendIcon'
import ReviewModal from './ReviewModal'


export default class BookShowPage extends Component {

  state={
    showUserFriendsList: false,
    showConfirmMessage: false,
    showReccMessage: false
  }

  goBack=()=>{
    window.history.back()
  }

  handleButtonClick=()=>{
    this.setState({
      showConfirmMessage: true
    })
  }

  handleReccButton=()=>{
    this.setState({
      showReccMessage: true
    })
  }
  // set timeout to make message disappear?

  handleRecc=()=>{
    this.setState({
      showUserFriendsList: true
    })
  }


  render(){

    return(
      <Container style={{marginLeft:"70px", marginRight:"70px", marginTop:"30px", marginBottom:"30px", textAlign:"left"}}>
      <Grid>
        <Grid.Row columns={4}>

          <Grid.Column width={4}>
            <img src={this.props.selectedBookData.volumeInfo.imageLinks.thumbnail} alt="book"/>
          </Grid.Column>

          <Grid.Column width={5}>
            <Header as='h2' className="subhead"> {this.props.selectedBookData.volumeInfo.title} </Header>
            {this.props.selectedBookData.volumeInfo.authors.map((author)=>{
              return <Header as='h3' className="subhead"> {author} </Header>
            })}
            <Header as='h4' className="subhead">Published: {this.props.selectedBookData.volumeInfo.publishedDate}</Header>
            <Header as='h4' className="subhead">Page Count: {this.props.selectedBookData.volumeInfo.pageCount}</Header>
            {this.props.selectedBookData.volumeInfo.categories.map((category)=>{
              return <Header as='h5' className="subhead"> {category} </Header>
            })}
          </Grid.Column>

          <Grid.Column width={4} style={{textAlign:"center"}}>

          <Message floating positive
            hidden={!this.state.showConfirmMessage}
            visible={this.state.showConfirmMessage}><h2 className="subhead">Added to your bookshelf!</h2>
          </Message>
          <Message floating positive
            hidden={!this.state.showReccMessage}
            visible={this.state.showReccMessage}><h2 className="subhead">Recommended!</h2>
          </Message>

            <Button animated
              onClick={(event)=>{
              this.props.handleReadClick(event);
              this.handleButtonClick()
            }}>

              <Button.Content visible><h2 className="subhead">mark as read</h2></Button.Content>
              <Button.Content hidden>
                <Icon name="checkmark" />
              </Button.Content>
            </Button>
            <br/><br/>

            <Button animated
              onClick={(event)=>{
              this.props.handleWantToReadClick(event);
              this.handleButtonClick()
            }}>

              <Button.Content visible><h2 className="subhead">want to read</h2></Button.Content>
              <Button.Content hidden>
                <Icon name="book" />
              </Button.Content>
            </Button>
            <br/><br/>

            <Button animated onClick={this.handleRecc}>
              <Button.Content visible><h2 className="subhead">recommend</h2></Button.Content>
              <Button.Content hidden>
                <Icon name="thumbs up" />
              </Button.Content>
            </Button>
            <br/><br/>


            <Popup trigger={<Button name="purchase" icon="amazon" onClick={this.props.handlePurchaseClick} />} content="purchase link" />

            <ReviewModal selectedBookData={this.props.selectedBookData}
            handleBookReview={this.props.handleBookReview}
            />


          </Grid.Column>

          <Grid.Column width={2}>

            {this.state.showUserFriendsList ?
              this.props.userFriends.map((friend)=>{
                return (
                  <div id={friend.friend.id}
                  onClick={(event)=>{
                    this.props.handleRecommendClick(event);
                    this.handleReccButton()
                  }}>
                  <FriendIcon id={friend.friend.id} key={friend.friend.id} friend={friend.friend} />
                  </div>
                )
              })
            :
              null
            }
          </Grid.Column>

        </Grid.Row>

        <Grid.Row columns={1}>
          <Grid.Column>
            {this.props.selectedBookData.volumeInfo.subtitle ?
              <Header as='h3' className="subhead">"{this.props.selectedBookData.volumeInfo.subtitle}"</Header>
            :
              null
            }
            <Header as='h4' className="subhead">Description:</Header>
              <p>
                {this.props.selectedBookData.volumeInfo.description}
              </p>
          </Grid.Column>
        </Grid.Row>

      </Grid>

      <br/><br/><br/>
      <Button onClick={this.goBack}><h2 className="subhead"> go back </h2></Button>
      </Container>
    )
  }

}
