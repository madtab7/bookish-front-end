import React, { Component } from 'react';
import { Grid, Card, Divider, Segment, Icon, Accordion } from 'semantic-ui-react'
import BookCardUser from './BookCardUser'
import FriendIcon from './FriendIcon'
import InternalAdapter from '../apis/InternalAdapter'

export default class UserPage extends Component{

  state = {
    userBooks:[],
    wantToReadBooks:[],
    readBooks:[],
    userFriends:[],
    recommendedBooks:[],
    booksRecommendedToUser:[],
    activeIndex:""
  }

  ///NEED TO REFACTOR
  componentDidMount=()=>{
    this.getUserData()
  }

  getUserData=()=>{
    let userId = this.props.id
    console.log(userId)
    InternalAdapter.getUserShevedBooks(userId)
    .then(userBooks => {
      this.setState({
        userBooks: userBooks
      })
      let wantToReadBooks = userBooks.filter((book)=>{
        return book.want_to_read === true
      })
      let readBooks = userBooks.filter((book)=>{
        return book.read === true
      })
      let recommendedBooks = userBooks.filter((book)=>{
        return book.recommended === true
      })
      this.setState({
        wantToReadBooks,
        readBooks,
        recommendedBooks
      })
    })
    InternalAdapter.getAllShelvedBooks(userId)
    .then(shelvedBooks => {
      let booksRecommendedToUser = shelvedBooks.filter((book)=>{
        return book.friend_id === userId
      })
      this.setState({
        booksRecommendedToUser
      })
    })
    InternalAdapter.getUserFriends(userId)
    .then(userFriends => {
      this.setState({
        userFriends
      })
    })
  }


  handleUpdateBook=(event)=>{
    let bookId = event.target.parentElement.id
    if(event.target.parentElement.name === "read"){
      InternalAdapter.updateUserBookshelfToRead(bookId)
    } else if (event.target.parentElement.name === "remove"){
      InternalAdapter.updateUserBookshelfToRemove(bookId)
    }
    this.getUserData()
    //not triggering re render
  }

  ////////////////// FOR Accordion
  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }
  ////////////////////

  countWantToRead=()=>{
    return this.state.wantToReadBooks.length
  }

  countRead=()=>{
    return this.state.readBooks.length
  }

  countFriends=()=>{
    return this.state.userFriends.length
  }

  countRecommendedBooks=()=>{
    return this.state.recommendedBooks.length
  }

  countBooksRecommendedToUser=()=>{
    return this.state.booksRecommendedToUser.length
  }

  render(){

    return(
      <Grid columns={2} style={{marginLeft:"10%", marginRight:"10%", marginTop:"2%"}}>
        <Grid.Column width={5} rows={2}>
          <Grid.Row>
            <img src={this.props.avatarURL} id="avatarImg" style={{borderRadius:"5px"}}/>
          </Grid.Row>
          <br></br>
          <Grid.Row>
            <h3 className="subhead" style={{textAlign:"left", marginLeft:"0%", marginTop:"2%"}}>Friends({this.countFriends()})</h3>
            {this.state.userFriends.map((friend)=>{
              return <FriendIcon key={friend.id} friend={friend.friend}/>
            })}
          </Grid.Row>
        </Grid.Column>

        <Grid.Column width={11}>

        <h1 className="subhead" style={{textAlign:"center", fontSize:"2em"}}>{this.props.username}'s Bookshelf <Icon name="book" /></h1>
        <br/>


          <Accordion fluid styled exclusive={false}>

            <Accordion.Title active={this.state.activeIndex === 0} index={0} onClick={this.handleClick}>
              <h2 className="subhead" style={{fontSize:"1.5em"}}>WANT TO READ ({this.countWantToRead()}) <Icon name='dropdown' /></h2>
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === 0}>
              <Card.Group itemsPerRow={4}>
                {this.state.wantToReadBooks.map((book)=>{
                  return <BookCardUser key={book.id} book={book} handleUpdateBook={this.handleUpdateBook}/>
                })}
              </Card.Group>
            </Accordion.Content>


            <Accordion.Title active={this.state.activeIndex === 1} index={1} onClick={this.handleClick}>
              <h2 className="subhead" style={{fontSize:"1.5em"}}>READ ({this.countRead()}) <Icon name='dropdown' /></h2>
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === 1}>
              <Card.Group itemsPerRow={4}>
                {this.state.readBooks.map((book)=>{
                  return <BookCardUser key={book.id} book={book}/>
                })}
              </Card.Group>
            </Accordion.Content>


            <Accordion.Title active={this.state.activeIndex === 2} index={2} onClick={this.handleClick}>
              <h2 className="subhead" style={{fontSize:"1.5em"}}>BOOKS MY FRIENDS RECOMMENDED ({this.countBooksRecommendedToUser()}) <Icon name='dropdown' /></h2>
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === 2}>
              <Card.Group itemsPerRow={4}>
                {this.state.booksRecommendedToUser.map((book)=>{
                  return <BookCardUser key={book.id} book={book}/>
                })}
              </Card.Group>
            </Accordion.Content>


            <Accordion.Title active={this.state.activeIndex === 3} index={3} onClick={this.handleClick}>
              <h2 className="subhead" style={{fontSize:"1.5em"}}>BOOKS I'VE RECOMMENDED ({this.countRecommendedBooks()}) <Icon name='dropdown' /></h2>
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === 3}>
              <Card.Group itemsPerRow={4}>
                {this.state.recommendedBooks.map((book)=>{
                  return <BookCardUser key={book.id} book={book}/>
                })}
              </Card.Group>
            </Accordion.Content>


          </Accordion>



        </Grid.Column>

      </Grid>
    )
  }
}
