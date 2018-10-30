import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import KeywordSearchForm from './KeywordSearchForm'

export default class InitialSearch extends Component{

  state={
    clicked:"",
    userInput:"",
    radioSelect: ""
  }

  handleButtonClick=(event)=>{
    this.setState({
      clicked: event.target.parentNode.name
    })
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
  handleInputSubmit=(event)=>{
    console.log(this.state)
  }

  ///////LIST FORM SEARCH ///////

  render(){
    //return to conditionally render select / input option for user
    return(
      <div style={{textAlign:"center"}}>
        <br></br>
        Find a book by:
        <br></br>
        <br></br>
        <Button basic color='black' name='keyword' animated='fade' onClick={this.handleButtonClick}>
          <Button.Content visible> keyword </Button.Content>
          <Button.Content hidden> GO </Button.Content>
        </Button>
        <Button basic color='black' name='best-sellers' animated='fade' onClick={this.handleButtonClick}>
          <Button.Content visible> best sellers </Button.Content>
          <Button.Content hidden> GO </Button.Content>
        </Button>

        <br></br>
        <br></br>
        {this.state.clicked === "keyword" ?
          <KeywordSearchForm
            handleInputChange={this.handleInputChange}
            handleRadioChange={this.handleRadioChange}
            handleInputSubmit={this.handleInputSubmit}
            userInput={this.state.userInput}
            radioSelect={this.state.radioSelect}
          />
        :
        null
        }

      </div>
    )
  }
}
