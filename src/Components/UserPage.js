import React, { Component } from 'react';
import { Grid, Card, Divider, Segment, Icon, Accordion, List, Rating, Button } from 'semantic-ui-react'
import { BrowserRouter as Router, NavLink, Route, withRouter } from 'react-router-dom'
import BookCardUser from './BookCardUser'
import FriendIcon from './FriendIcon'
import ReviewModal from './ReviewModal'
import EditReviewModal from './EditReviewModal'
import InternalAdapter from '../apis/InternalAdapter'
import Bookshelves from '../images/bookshelves.jpg'
import Bookshelves2 from '../images/bookshelves2.jpg'

export default class UserPage extends Component{

  state = {
    userBooks:[],
    wantToReadBooks:[],
    readBooks:[],
    userFriends:[],
    recommendedBooks:[],
    booksRecommendedToUser:[],
    userReviews:[],
    activeIndex:"",
    selectedBookData:[]
  }

  ///NEED TO REFACTOR
  componentDidMount=()=>{
    this.getUserData()
  }

  getUserData=()=>{
    let userId = this.props.id
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
    InternalAdapter.getUserReviews(userId)
    .then(userReviews => {
      this.setState({
        userReviews
      })
    })
  }


  handleUpdateBook=(event)=>{
    let bookId = event.target.parentElement.id
    if(event.target.parentElement.name === "read"){
      InternalAdapter.updateUserBookshelfToRead(bookId)
      // this.forceUpdate()
      this.getUserData()
    } else if (event.target.parentElement.name === "remove"){
      InternalAdapter.updateUserBookshelfToRemove(bookId)
      // this.forceUpdate()
      this.getUserData()
    }
  }

  handleBookClick=(event)=>{
    let bookId = event.target.id
    InternalAdapter.getUserBookInfo(bookId)
    .then(selectedBookData => {
      this.setState({
        selectedBookData
      })
    })
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

  countReviews=()=>{
    return this.state.userReviews.length
  }

  render(){

    return(
      <div style={{
        backgroundImage:`url(${Bookshelves2})`,
        marginTop:"1.1%",
        backgroundRepeat:"repeat",
        backgroundSize:"cover",
        width: "100%",
        height:"2000px"
      }}>

      <Grid columns={2} style={{marginLeft:"10%", marginRight:"10%"}}>
        <Grid.Column width={4} rows={2}
          style={{
            background:"rgba(255,255,255,255)",
            borderTopLeftRadius:"15px",
            borderBottomLeftRadius:"15px",
            marginTop:"5%"
          }}>
          <Grid.Row>
            <img src={this.props.avatarURL} id="avatarImg" style={{borderRadius:"5px"}}/>
          </Grid.Row>
          <br></br>
          <Grid.Row>
            <h3 className="subhead" style={{textAlign:"left", marginLeft:"0%", marginTop:"2%"}}>Friends({this.countFriends()})</h3>
            {this.state.userFriends.map((friend)=>{
              return <FriendIcon key={friend.id} friend={friend.friend}/>
            })}
            <br></br>
            <NavLink
              to='/community'
              exact style={{color:"black"}}
            >
            <h4 style={{fontSize:"0.8em"}}> <Icon name="globe" size="small"/> See all users</h4>
            </NavLink>

          </Grid.Row>
        </Grid.Column>

        <Grid.Column width={11}
          style={{
            background:"rgba(255,255,255,255)",
            borderTopRightRadius:"15px",
            borderBottomRightRadius:"15px",
            marginTop:"5%"
          }}>

        <h1 className="subhead" style={{textAlign:"center", fontSize:"2em"}}>{this.props.username}'s Bookshelf <Icon name="book" /></h1>
        <br/>


          <Accordion fluid styled exclusive={false}>

            <Accordion.Title active={this.state.activeIndex === 0} index={0} onClick={this.handleClick}>
              <h2 className="subhead" style={{fontSize:"1.5em"}}>WANT TO READ ({this.countWantToRead()}) <Icon name='dropdown' /></h2>
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === 0}>
              <Card.Group itemsPerRow={4}>
                {this.state.wantToReadBooks.map((book)=>{
                  return <BookCardUser key={book.id} book={book} handleUpdateBook={this.handleUpdateBook}
                  handleBookClick={this.handleBookClick}/>
                })}
              </Card.Group>
            </Accordion.Content>


            <Accordion.Title active={this.state.activeIndex === 1} index={1} onClick={this.handleClick}>
              <h2 className="subhead" style={{fontSize:"1.5em"}}>READ ({this.countRead()}) <Icon name='dropdown' /></h2>
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === 1}>
              <Card.Group itemsPerRow={4}>
                {this.state.readBooks.map((book)=>{
                  return <BookCardUser
                  handleBookReview={this.props.handleBookReview}
                  handleRecommendUserBook={this.props.handleRecommendUserBook}
                  handleBookClick={this.handleBookClick}
                  userFriends={this.state.userFriends}
                  key={book.id}
                  book={book}/>
                })}
              </Card.Group>
            </Accordion.Content>

            <Accordion.Title active={this.state.activeIndex === 2} index={2} onClick={this.handleClick}>
              <h2 className="subhead" style={{fontSize:"1.5em"}}>REVIEWED ({this.countReviews()}) <Icon name='dropdown' /></h2>
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === 2}>
              <List divided verticalAlign='middle'>
                {this.state.userReviews.map((review)=>{
                  return(
                    <List.Item>
                    <List.Content floated='right'>

                      <EditReviewModal
                        review={review}
                        book={review.book}
                        handleUpdatedReview={this.props.handleUpdatedReview}
                        handleDeletedReview={this.props.handleDeletedReview}
                      />

                    </List.Content>
                    <List.Content>
                      <List.Header className="subhead">
                        {review.book.title} by {review.book.author}
                      </List.Header>
                      <Rating
                        defaultRating={review.rating}
                        maxRating={5}
                        disabled
                      />
                      <br/>
                      "{review.title}"
                      <br/>
                      {review.content}
                    </List.Content>
                  </List.Item>


                  )
                })}
              </List>
            </Accordion.Content>


            <Accordion.Title active={this.state.activeIndex === 3} index={3} onClick={this.handleClick}>
              <h2 className="subhead" style={{fontSize:"1.5em"}}>BOOKS MY FRIENDS RECOMMENDED ({this.countBooksRecommendedToUser()}) <Icon name='dropdown' /></h2>
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === 3}>
              <Card.Group itemsPerRow={4}>
                {this.state.booksRecommendedToUser.map((book)=>{
                  return <BookCardUser key={book.id} book={book} handleBookClick={this.handleBookClick}/>
                })}
              </Card.Group>
            </Accordion.Content>


            <Accordion.Title active={this.state.activeIndex === 4} index={4} onClick={this.handleClick}>
              <h2 className="subhead" style={{fontSize:"1.5em"}}>BOOKS I'VE RECOMMENDED ({this.countRecommendedBooks()}) <Icon name='dropdown' /></h2>
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === 4}>
              <Card.Group itemsPerRow={4}>
                {this.state.recommendedBooks.map((book)=>{
                  return <BookCardUser key={book.id} book={book} handleBookClick={this.handleBookClick}/>
                })}
              </Card.Group>
            </Accordion.Content>


          </Accordion>



        </Grid.Column>

      </Grid>
      </div>
    )
  }
}
