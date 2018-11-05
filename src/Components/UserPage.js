import React, { Component } from 'react';
import { Grid, Card, Divider, Segment } from 'semantic-ui-react'
import BookCardUser from './BookCardUser'
import InternalAdapter from '../apis/InternalAdapter'

export default class UserPage extends Component{

  state = {
    userBooks:[],
    wantToReadBooks:[],
    readBooks:[]
  }

  ///NEED TO REFACTOR
  componentDidMount=()=>{
    this.getUserBookData()
  }

  getUserBookData=()=>{
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
      this.setState({
        wantToReadBooks,
        readBooks
      })
    })
  }

  handleUpdateBook=(event)=>{
    console.log(event.target.parentElement.name)
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

  render(){

    return(
      <Grid columns={2} style={{marginLeft:"10%", marginRight:"10%", marginTop:"2%"}}>
        <Grid.Column width={5}>
          <img src={this.props.currentUserData.avatarURL} id="avatarImg" style={{borderRadius:"5px"}}/>
        </Grid.Column>

        <Grid.Column width={10}>
        <h1 className="subhead" style={{textAlign:"center", fontSize:"2em"}}>{this.props.currentUserData.username}'s Bookshelf</h1>
          <h2 className="subhead" style={{fontSize:"1.5em"}}>WANT TO READ ({this.countWantToRead()})</h2>
            <Card.Group itemsPerRow={4}>
                {this.state.wantToReadBooks.map((book)=>{
                  return <BookCardUser key={book.id} book={book} handleUpdateBook={this.handleUpdateBook}/>
                })}
            </Card.Group>

        <Divider />

          <h2 className="subhead" style={{fontSize:"1.5em"}}>READ ({this.countRead()})</h2>
            <Card.Group itemsPerRow={4}>
                {this.state.readBooks.map((book)=>{
                  return <BookCardUser key={book.id} book={book}/>
                })}
            </Card.Group>
        </Grid.Column>

      </Grid>
    )
  }
}
