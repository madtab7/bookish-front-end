import React, { Component } from 'react';
import InitialSearch from '../Components/InitialSearch'
import SearchResultsG from '../Components/SearchResultsG'
import Adapter from '../Adapter'

export default class SearchContainer extends Component{

  state={
    searchPerformed: false,
    userInput:"",
    radioSelect: "",
    listSelect: "",
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
        searchPerformed: true
      },()=>console.log(this.state.searchData))
    })

  }

  ///////LIST FORM SEARCH ///////

  //handled user selection, need to call Adapter and get data
  handleDropdownSelect=(event, data)=>{
    this.setState({
      listSelect: data.value
    })
  }

  render(){

    return(
      <div>
      {this.state.searchPerformed ?
        <SearchResultsG
        searchData={this.state.searchData}
        userInput={this.state.userInput}
        />
      :
        <InitialSearch
        toggleSearchPerformed={this.toggleSearchPerformed}
        handleInputChange={this.handleInputChange}
        handleRadioChange={this.handleRadioChange}
        handleInputSubmit={this.handleInputSubmit}
        userInput={this.state.userInput}
        radioSelect={this.state.radioSelect}
        handleDropdownSelect={this.handleDropdownSelect}
        />
      }
      </div>
    )
  }
}
