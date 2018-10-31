import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import KeywordSearchForm from './KeywordSearchForm'
import ListFormSearch from './ListFormSearch'

export default class InitialSearch extends Component{

  state={
    clicked:""
  }

  handleButtonClick=(event)=>{
    this.setState({
      clicked: event.target.parentNode.name
    })
  }


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
            handleInputChange={this.props.handleInputChange}
            handleRadioChange={this.props.handleRadioChange}
            handleInputSubmit={this.props.handleInputSubmit}
            userInput={this.propsuserInput}
            radioSelect={this.props.radioSelect}
          />
        :
          null
        }

        {this.state.clicked === "best-sellers" ?
          <ListFormSearch
            handleDropdownSelect={this.props.handleDropdownSelect}
          />
        :
          null
        }

      </div>
    )
  }
}
