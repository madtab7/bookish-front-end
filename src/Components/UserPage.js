import React, { Component } from 'react';
import { Grid, Card, Divider, Segment } from 'semantic-ui-react'
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
    booksRecommendedToUser:[]
  }

  ///NEED TO REFACTOR
  componentDidMount=()=>{
    this.getUserData()
  }

  getUserData=()=>{
    let userId = this.props.currentUserData.id
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
    this.getUserBookData()
    //not triggering re render
  }

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

  //NEED TO ADD ERROR PROTECTION IF NO BOOKS ARE ON LIST

  render(){

    return(
      <Grid columns={2} style={{marginLeft:"10%", marginRight:"10%", marginTop:"2%"}}>
        <Grid.Column width={5} rows={2}>
          <Grid.Row>
            <img src={this.props.currentUserData.avatarURL} id="avatarImg" style={{borderRadius:"5px"}}/>
          </Grid.Row>

          <Grid.Row>
            <h3 className="subhead" style={{textAlign:"left", marginLeft:"0%", marginTop:"2%"}}>Friends({this.countFriends()})</h3>
            {this.state.userFriends.map((friend)=>{
              return <FriendIcon key={friend.id} friend={friend.friend}/>
            })}
          </Grid.Row>
        </Grid.Column>

        <Grid.Column width={10}>

        <h1 className="subhead" style={{textAlign:"center", fontSize:"2em"}}>{this.props.currentUserData.username}'s Bookshelf</h1>
        <br/>
          {this.state.wantToReadBooks ?
            <Segment>
            <h2 className="subhead" style={{fontSize:"1.5em"}}>WANT TO READ ({this.countWantToRead()})</h2>
            <Card.Group itemsPerRow={4}>
            {this.state.wantToReadBooks.map((book)=>{
              return <BookCardUser key={book.id} book={book} handleUpdateBook={this.handleUpdateBook}/>
            })}
            </Card.Group>

            <Divider />
            </Segment>
          :
            null
          }

          {this.state.readBooks ?
            <Segment>
            <h2 className="subhead" style={{fontSize:"1.5em"}}>READ ({this.countRead()})</h2>
            <Card.Group itemsPerRow={4}>
            {this.state.readBooks.map((book)=>{
              return <BookCardUser key={book.id} book={book}/>
            })}
            </Card.Group>

            <Divider />
            </Segment>
          :
            null
          }

          {this.state.booksRecommendedToUser ?
            <Segment>
            <h2 className="subhead" style={{fontSize:"1.5em"}}>BOOKS FRIENDS RECOMMENDED ({this.countBooksRecommendedToUser()})</h2>
            <Card.Group itemsPerRow={4}>
            {this.state.booksRecommendedToUser.map((book)=>{
              return <BookCardUser key={book.id} book={book}/>
            })}
            </Card.Group>

            <Divider />
            </Segment>
          :
            null
          }

          {this.state.recommendedBooks ?
            <Segment>
            <h2 className="subhead" style={{fontSize:"1.5em"}}>BOOKS I'VE RECOMMENDED ({this.countRecommendedBooks()})</h2>
            <Card.Group itemsPerRow={4}>
            {this.state.recommendedBooks.map((book)=>{
              return <BookCardUser key={book.id} book={book}/>
            })}
            </Card.Group>

            <Divider />
            </Segment>
          :
            null
          }


        </Grid.Column>

      </Grid>
    )
  }
}
