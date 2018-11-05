import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import KeywordSearchForm from './KeywordSearchForm'
import ListFormSearch from './ListFormSearch'
import Bookshelf2 from '../images/bookshelf2.jpg'

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
      <div style={{
        textAlign:"center",
        backgroundImage:`url(${Bookshelf2})`,
        marginTop:"0%",
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover",
        width: "100%",
        height:"800px"
      }}>
        <br></br>
        <br></br>
      <div style={{
        background:"rgba(255,255,255,0.5)",
        width:"60%",
        marginLeft:"20%",
        borderRadius:"25px"
      }}>
        <h1 className="subhead" style={{fontSize:"2em", paddingTop:"5%"}}>Find a book by:</h1>
        <br></br>
        <br></br>
        <Button
          size="massive"
          name='keyword'
          animated='fade'
          style={{color:"black"}}
          onClick={this.handleButtonClick}>
          <Button.Content visible className="subhead"> keywords </Button.Content>
          <Button.Content hidden className="subhead"> GO </Button.Content>
        </Button>
        <Button
          size="massive"
          name='best-sellers'
          animated='fade'
          style={{color:"black"}}
          onClick={this.handleButtonClick}>
          <Button.Content visible className="subhead"> best-sellers</Button.Content>
          <Button.Content hidden className="subhead">GO </Button.Content>
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
      </div>
    )
  }
}
