import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import KeywordSearchForm from './KeywordSearchForm'
import ListFormSearch from './ListFormSearch'
import Bookshelf2 from '../images/bookshelf2.jpg'

export default class InitialSearch extends Component{


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
        background:"rgba(255,255,255,0.65)",
        width:"60%",
        marginLeft:"20%",
        borderRadius:"15px"
      }}>
        <h1 className="subhead" style={{fontSize:"2em", paddingTop:"5%"}}>
          Search by
        </h1>
          <h2 className="subhead" style={{fontSize:"1.5em"}}>Keywords:</h2>
            <KeywordSearchForm
              handleInputChange={this.props.handleInputChange}
              handleInputSubmit={this.props.handleInputSubmit}
              userInput={this.props.userInput}
            />
          <h2 className="subhead" style={{fontSize:"1.5em"}}>-OR-</h2>
          <h2 className="subhead" style={{fontSize:"1.5em"}}>Select a New York Times Best-Seller List:</h2>
            <ListFormSearch
              handleDropdownSelect={this.props.handleDropdownSelect}
            />

        <br></br>

      </div>
      </div>
    )
  }
}
