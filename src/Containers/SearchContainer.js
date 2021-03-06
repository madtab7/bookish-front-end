import React, { Component, Fragment } from 'react';
import InitialSearch from '../Components/InitialSearch'
import SearchResultsG from '../Components/SearchResultsG'
import SearchResultsNYT from '../Components/SearchResultsNYT'
import BookShowPage from '../Components/BookShowPage'
import NotFound from '../Components/NotFound'
import BooksAdapter from '../apis/BooksAdapter'
import InternalAdapter from '../apis/InternalAdapter'
import { Message } from 'semantic-ui-react'

class SearchContainer extends Component{

  state={
    searchPerformed:"",
    userInput:"",
    listSelect: "",
    NYTData:[],
    searchData: [],
    searchIndex: 0,
    selectedBookData:[],
    readBookData:[],
    wantToReadBookData:[],
    userFriends:[],
    showReviewConfirmMessage: false
  }

  ///////KEYWORD SEARCH FORM///////
  //user inputs into form
  handleInputChange=(event)=>{
    this.setState({
      userInput: event.target.value
    })
  }

  //user submits input in form
  handleInputSubmit=(event)=>{
    BooksAdapter.getBooksFromQuery(this.state)
    .then(response => response.json())
    .then(data=> {
      this.setState({
        searchData: data.items,
        searchPerformed: "googleQuery"
      })
    })

  }

  ///////LIST FORM SEARCH ///////
  //handle user selection, need to call Adapter and get data
  handleDropdownSelect=(event, data)=>{
    this.setState({
      listSelect: data.value
    },()=>{
      BooksAdapter.getBooksFromNYTList(this.state)
      .then(response => response.json())
      .then(data => {
        this.setState({
          NYTData: data.results.books,
          searchPerformed: "NYT"
        })
      })
    })
  }

  //// BOOK CLICK to SHOW PAGE ////
  //convert NYT data to google api to standardize data
  handleBookClick=(event)=>{
    let isbn;
    if(event.target.id !== "error"){
      isbn=event.target.id
    } else {
      isbn="error"
      //error protection added in render
    }
    BooksAdapter.getGoogleData(isbn)
    .then(response => response.json())
    .then(data => {
      this.setState({
        selectedBookData:data,
        searchPerformed:"bookClicked"
      })
    })
  }

  // adjust search results according to arrow button click
  handlePagination=(event)=>{
    if(event.target.parentElement.className.includes("increase")){
      this.setState({
        searchIndex: this.state.searchIndex + 40
      },()=>console.log(this.state.searchIndex))
    } else {
      this.setState({
        searchIndex: this.state.searchIndex - 40
      },()=>console.log(this.state.searchIndex))
    }
    BooksAdapter.getPaginatedBooksFromQuery(this.state)
    .then(data => {
      this.setState({
        searchData: data.items,
        searchPerformed: "googleQuery"
      })
    })


  }

  //READ BUTTON CLICK
  handleReadClick=(event)=>{
    const bookData= this.state.selectedBookData.items[0].volumeInfo
    const userId = this.props.currentUserData.id
    InternalAdapter.createUserBookRead(userId, bookData)
  }

  //WANT TO READ BUTTON CLICK
  handleWantToReadClick=(event)=>{
    const bookData= this.state.selectedBookData.items[0].volumeInfo
    const userId = this.props.currentUserData.id
    InternalAdapter.createUserBookWantToRead(userId, bookData)
  }

  //REVIEW CLICK
  handleBookReview = (reviewObj) => {
    const bookData= this.state.selectedBookData.items[0].volumeInfo
    const userId = this.props.currentUserData.id
    InternalAdapter.createBookReview(userId, bookData, reviewObj)
    this.setState({
      showReviewConfirmMessage: true
    })
  }

  //PURCHASE BUTTON CLICK
  handlePurchaseClick=(event)=>{
    const bookData= this.state.selectedBookData.items[0].volumeInfo
    let isbn = bookData.industryIdentifiers[1].identifier
    window.open(`${BooksAdapter.getAmazonLink(isbn)}`)
  }

  //RECOMMEND BUTTON CLICK
  handleRecommendClick=(event)=>{
    const bookData = this.state.selectedBookData.items[0].volumeInfo
    const userId = this.props.currentUserData.id
    const friendId = parseInt(event.target.id)
    InternalAdapter.createBookUserRecommends(userId, friendId, bookData)
  }


  componentDidMount=()=>{
    const userId = this.props.currentUserData.id
    InternalAdapter.getUserFriends(userId)
    .then(userFriends => {
      this.setState({
        userFriends
      })
    })
  }

  render(){
    switch(this.state.searchPerformed){
      case "googleQuery":
        return(
          <SearchResultsG
            searchData={this.state.searchData}
            searchIndex={this.state.searchIndex}
            userInput={this.state.userInput}
            handlePagination={this.handlePagination}
            handleBookClick={this.handleBookClick}
          />
        );
      case "NYT":
        return(
          <SearchResultsNYT
            NYTData={this.state.NYTData}
            listSelect={this.state.listSelect}
            handleBookClick={this.handleBookClick}
          />
        );
      case "bookClicked":
        if (this.state.selectedBookData.items === undefined){
          return(
            <Fragment >
              <NotFound message={"Sorry - We dont have any information on that book at this time!"}/>
            </Fragment>
          )
        } else {
          return (
            <Fragment>

            <Message floating positive
              hidden={!this.state.showReviewConfirmMessage}
              visible={this.state.showReviewConfirmMessage}>Your review has been submitted.
            </Message>

            <BookShowPage
            selectedBookData={this.state.selectedBookData.items[0]}
            handleReadClick={this.handleReadClick}
            handleWantToReadClick={this.handleWantToReadClick}
            handlePurchaseClick={this.handlePurchaseClick}
            handleRecommendClick={this.handleRecommendClick}
            handleBookReview={this.handleBookReview}
            userFriends={this.state.userFriends}
            />
            </Fragment>
          )
        }
      default:
        return(
          <InitialSearch
            toggleSearchPerformed={this.toggleSearchPerformed}
            handleInputChange={this.handleInputChange}
            handleRadioChange={this.handleRadioChange}
            handleInputSubmit={this.handleInputSubmit}
            userInput={this.state.userInput}
            radioSelect={this.state.radioSelect}
            handleDropdownSelect={this.handleDropdownSelect}
          />
        )
    }
  }
}

export default SearchContainer
