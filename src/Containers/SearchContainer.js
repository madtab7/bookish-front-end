import React, { Component } from 'react';
import InitialSearch from '../Components/InitialSearch'
import SearchResultsG from '../Components/SearchResultsG'
import SearchResultsNYT from '../Components/SearchResultsNYT'
import Adapter from '../Adapter'

export default class SearchContainer extends Component{

  state={
    searchPerformed:"",
    userInput:"",
    radioSelect: "",
    listSelect: "",
    NYTData:[],
    searchData: []
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
    Adapter.getBooksFromQuery(this.state)
    .then(response => response.json())
    .then(data=> {
      this.setState({
        searchData: data.items,
        searchPerformed: "googleQuery"
      },()=>console.log(this.state.searchData))
    })

  }

  ///////LIST FORM SEARCH ///////

  //handle user selection, need to call Adapter and get data
  handleDropdownSelect=(event, data)=>{
    this.setState({
      listSelect: data.value
    },()=>{
      Adapter.getBooksFromNYTList(this.state)
      .then(response => response.json())
      .then(data => {
        this.setState({
          NYTData: data.results.books,
          searchPerformed: "NYT"
        },()=> console.log(this.state))
      })
    })
  }

  render(){

    switch(this.state.searchPerformed){
      case "googleQuery":
        return(
          <SearchResultsG
            searchData={this.state.searchData}
            userInput={this.state.userInput}
          />
        );
      case "NYT":
        return(
          <SearchResultsNYT
          />
        );
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
