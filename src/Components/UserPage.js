import React, { Component } from 'react';
import { Grid, Card, Icon, Accordion, List, Rating, Message } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import BookCardUser from './BookCardUser'
import FriendIcon from './FriendIcon'
import BookModalUserPage from './BookModalUserPage'
import EditReviewModal from './EditReviewModal'
import InternalAdapter from '../apis/InternalAdapter'
import Bookshelves2 from '../images/bookshelves2.jpg'
import FriendsAccordion from './FriendsAccordion'

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
    selectedBookData:[],
    modalOpen: false,
    showUpdatedBookshelfMessage: false,
    showDeleteMessage: false,
    showEditMessage: false,
    showReccMessage: false
  }

  ///NEED TO REFACTOR
  componentDidMount=()=>{
    this.getUsersBooks()
    this.getUserData()
  }

  getUsersBooks=()=>{
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
  }

  getUserData=()=>{
    let userId = this.props.id
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

  //OPTIMISTICALLY RENDERING
  handleUpdateBook=(event, bookObj)=>{
    let bookId = event.target.parentElement.id
    let idx = this.state.wantToReadBooks.indexOf(bookObj)
    let removeIdx = this.state.wantToReadBooks.splice(idx,1)
    let updatedArr = this.state.wantToReadBooks
    if(event.target.parentElement.name === "read"){
      this.setState({
        readBooks: [...this.state.readBooks, bookObj],
        wantToReadBooks: updatedArr,
        showUpdatedBookshelfMessage: true
      })
      InternalAdapter.updateUserBookshelfToRead(bookId)
    } else if (event.target.parentElement.name === "remove"){
      this.setState({
        wantToReadBooks: updatedArr,
        showUpdatedBookshelfMessage: true
      })
      InternalAdapter.updateUserBookshelfToRemove(bookId)
    }
    this.timeout = setTimeout(()=>{
      this.setState({showUpdatedBookshelfMessage: false})
    }, 3000)
  }

  ////////// partially optimistically rendering user reviews ///////
  handleUpdatedReview=(reviewObj, reviewId, bookObj)=>{
    InternalAdapter.updateUserReview(reviewObj, reviewId)
    const newReviewObj = Object.assign({}, {
      id: reviewId,
      title: reviewObj.title,
      book_id: bookObj.id,
      content: reviewObj.review,
      rating: reviewObj.rating,
      user_id: this.props.id
    })
    const reviewObjWithBook = Object.assign({}, newReviewObj)
    reviewObjWithBook.book = bookObj
    let idx = this.state.userReviews.indexOf(reviewObj)
    let removeReplaceIdx = this.state.userReviews.splice(idx, 1, reviewObjWithBook)
    let updatedArr = this.state.userReviews
    this.setState({
      showEditMessage: true,
      userReviews: updatedArr
    })
    this.timeout = setTimeout(()=>{
      this.setState({showEditMessage: false})
    }, 3000)
  }

  /////// optimistically rendering
  handleDeletedReview=(event, reviewId)=>{
    InternalAdapter.deleteUserReview(reviewId)
    let filteredArr = this.state.userReviews.filter((review)=>{
      return review.id !== reviewId
    })
    this.setState({
      showDeleteMessage: true,
      userReviews: filteredArr
    })
    this.timeout = setTimeout(()=>{
      this.setState({showDeleteMessage: false})
    }, 3000)
  }

  //optimistically rendering
  handleBookReview=(reviewObj, bookData)=>{
    const userId = this.props.id
    let bookId;
    if (typeof bookData == "number" ){
      bookId = bookData
    } else {
      bookId = bookData.id
      const reviewObjWithBook = Object.assign({}, reviewObj)
      reviewObjWithBook.book = bookData
      this.setState({
        userReviews: [...this.state.userReviews, reviewObjWithBook]
      })
    }
    InternalAdapter.createReviewFromReadBook(userId, bookId, reviewObj)
  }

  //optimistically rendering
  handleRecommendUserBook=(event, bookData)=>{
    const userId = this.props.id
    const bookId = bookData.id
    const friendId = parseInt(event.target.id)
    let updatedRecommendedBooks = this.state.recommendedBooks
    const recommendation = Object.assign({}, {
      id: null,
      read: null,
      recommended: true,
      user_id: this.props.id,
      want_to_read: null,
      friend_id: friendId
    })
    const recommendationWithBook = Object.assign({}, recommendation)
    recommendationWithBook.book = bookData
    this.setState({
      recommendedBooks: [...this.state.recommendedBooks, recommendationWithBook],
      showReccMessage: true
    })
    InternalAdapter.createRecommendationFromReadBook(userId, bookId, friendId)
    this.timeout = setTimeout(()=>{
      this.setState({showReccMessage: false})
    }, 3000)
  }


  //allows modal pop up on book click
  handleBookClick=(event)=>{
    if (event.target.name === "bookcard"){
      this.handleOpen()
      let bookId = event.target.id
      InternalAdapter.getUserBookInfo(bookId)
      .then(selectedBookData => {
        this.setState({
          selectedBookData
        })
      })
    }
  }

  // display counts for each accordion item
  count=(category)=>{
    return category.length
  }

  ////////////////// FOR Accordion
  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }
  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })
  ////////////////////

  render(){

    return(
      <div style={{
        backgroundImage:`url(${Bookshelves2})`,
        marginTop:"0.8%",
        backgroundRepeat:"repeat-y",
        backgroundSize:"cover",
        width: "100%",
        height:"3000px"
      }}>

      <Message floating positive
      hidden={!this.state.showUpdatedBookshelfMessage}
      visible={this.state.showUpdatedBookshelfMessage}><h2 className="subhead">Your bookshelf has been updated.</h2>
      </Message>

      <Message floating positive
      hidden={!this.state.showDeleteMessage}
      visible={this.state.showDeleteMessage}><h2 className="subhead">Your review has been deleted.</h2>
      </Message>

      <Message floating positive
      hidden={!this.state.showEditMessage}
      visible={this.state.showEditMessage}><h2 className="subhead">Your review has been updated. </h2>
      </Message>

      <Message floating positive
      hidden={!this.state.showReccMessage}
      visible={this.state.showReccMessage}><h2 className="subhead">Your recommendation has been sent.</h2>
      </Message>

      <Grid columns={2} style={{marginLeft:"10%", marginRight:"10%"}}>


        <Grid.Column width={4} rows={2}
          style={{
            background:"rgba(255,255,255,0.9)",
            borderTopLeftRadius:"15px",
            borderBottomLeftRadius:"15px",
            marginTop:"7%",
            paddingBottom:"20%"
          }}>
          <Grid.Row>
            <img src={this.props.avatarURL} id="avatarImg" style={{borderRadius:"5px"}}/>

            <h3 className="subhead" style={{textAlign:"left", marginLeft:"0%", marginTop:"2%"}}>{this.props.full_name}</h3>

          </Grid.Row>
          <br></br>
          <Grid.Row>

            <FriendsAccordion
              count={this.count}
              userFriends={this.state.userFriends}
            />

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
            background:"rgba(255,255,255,0.9)",
            borderTopRightRadius:"15px",
            borderBottomRightRadius:"15px",
            marginTop:"7%",
            paddingBottom:"20%"
          }}>

        <h1 className="subhead" style={{textAlign:"center", fontSize:"2em"}}>{this.props.username}'s Bookshelf <Icon name="book" /></h1>
        <br/>

          <BookModalUserPage
            open={this.state.modalOpen}
            handleClose={this.handleClose}
            selectedBookData={this.state.selectedBookData}
          />

          <Accordion fluid styled exclusive={false}>

            <Accordion.Title active={this.state.activeIndex === 0} index={0} onClick={this.handleClick}>
              <h2 className="subhead" style={{fontSize:"1.5em"}}>WANT TO READ ({this.count(this.state.wantToReadBooks)}) <Icon name='dropdown' /></h2>
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === 0}>
              <Card.Group itemsPerRow={5} centered>
                {this.state.wantToReadBooks.map((book)=>{
                  return <BookCardUser key={book.id} book={book} handleUpdateBook={this.handleUpdateBook}
                  handleBookClick={this.handleBookClick}/>
                })}
              </Card.Group>
            </Accordion.Content>


            <Accordion.Title active={this.state.activeIndex === 1} index={1} onClick={this.handleClick}>
              <h2 className="subhead" style={{fontSize:"1.5em"}}>READ ({this.count(this.state.readBooks)}) <Icon name='dropdown' /></h2>
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === 1}>
              <Card.Group itemsPerRow={5} centered>
                {this.state.readBooks.map((book)=>{
                  return <BookCardUser
                  handleBookReview={this.handleBookReview}
                  handleRecommendUserBook={this.handleRecommendUserBook}
                  handleBookClick={this.handleBookClick}
                  userFriends={this.state.userFriends}
                  key={book.id}
                  book={book}/>
                })}
              </Card.Group>
            </Accordion.Content>

            <Accordion.Title active={this.state.activeIndex === 2} index={2} onClick={this.handleClick}>
              <h2 className="subhead" style={{fontSize:"1.5em"}}>REVIEWED ({this.count(this.state.userReviews)}) <Icon name='dropdown' /></h2>
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
                        handleUpdatedReview={this.handleUpdatedReview}
                        handleDeletedReview={this.handleDeletedReview}
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
              <h2 className="subhead" style={{fontSize:"1.5em"}}>BOOKS MY FRIENDS RECOMMENDED ({this.count(this.state.booksRecommendedToUser)}) <Icon name='dropdown' /></h2>
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === 3}>
              <Card.Group itemsPerRow={5} centered>
                {this.state.booksRecommendedToUser.map((book)=>{
                  return <BookCardUser key={book.id} book={book} handleBookClick={this.handleBookClick}/>
                })}
              </Card.Group>
            </Accordion.Content>


            <Accordion.Title active={this.state.activeIndex === 4} index={4} onClick={this.handleClick}>
              <h2 className="subhead" style={{fontSize:"1.5em"}}>BOOKS I'VE RECOMMENDED ({this.count(this.state.recommendedBooks)}) <Icon name='dropdown' /></h2>
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === 4}>
              <Card.Group itemsPerRow={5} centered>
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
