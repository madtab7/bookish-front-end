import React, { Component } from 'react';
import BookCard from './BookCard'
import { Card } from 'semantic-ui-react'

export default class SearchResultsG extends Component{

  render(){
    console.log(this.props.searchData)
    return(
      <div>
      <h2>Top 40 results for '{this.props.userInput}'</h2>
        <Card.Group itemsPerRow={5} style={{marginLeft:"50px", marginRight:"50px", marginTop:"30px", marginBottom:"30px"}}>
          {this.props.searchData.map((book)=>{
            return <BookCard key={book.id} book={book}/>
          })}
        </Card.Group>
      </div>
    )
  }
}
