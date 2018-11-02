import React, { Component } from 'react';
import InitialSearch from '../Components/InitialSearch'
import SearchResultsG from '../Components/SearchResultsG'
import SearchResultsNYT from '../Components/SearchResultsNYT'
import BookShowPage from '../Components/BookShowPage'
import BooksAdapter from '../apis/BooksAdapter'

export default class SearchContainer extends Component{

  state={
    searchPerformed:"",
    userInput:"",
    radioSelect: "",
    listSelect: "",
    NYTData:[],
    searchData: [],
    selectedBookData:[]
  }

  ///////KEYWORD SEARCH FORM///////
  //user inputs into form
  handleInputChange=(event)=>{
    this.setState({
      userInput: event.target.value
    })
  }

  handleRadioChange=(event)=>{
    this.setState({
      radioSelect: event.target.innerText
    })
  }

  //user submits input in form
    //only registers submit on 2nd enter
  handleInputSubmit=(event)=>{
    event.preventDefault()
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
  //convert NYT data to google api to standardize
  handleBookClick=(event)=>{
    const isbn=event.target.id
    BooksAdapter.getGoogleData(isbn)
    .then(response => response.json())
    .then(data => {
      this.setState({
        selectedBookData:data,
        searchPerformed:"bookClicked"
      })
    })
    //need to add error protection
  }

  render(){

    switch(this.state.searchPerformed){
      case "googleQuery":
        return(
          <SearchResultsG
            searchData={this.state.searchData}
            userInput={this.state.userInput}
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
        return(
          <BookShowPage
            selectedBookData={this.state.selectedBookData.items[0]}
          />
        )
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
