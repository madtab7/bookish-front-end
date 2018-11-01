import React, { Component } from 'react';
import BookCardG from './BookCardG'
import { Card } from 'semantic-ui-react'

const SearchResultsG =(props)=>{

  return(
    <div>
    <h2>Top results for '{props.userInput}'</h2>
      <Card.Group itemsPerRow={5} style={{marginLeft:"50px", marginRight:"50px", marginTop:"30px", marginBottom:"30px"}}>
        {props.searchData.map((book)=>{
          return <BookCardG key={book.id} book={book} handleBookClick={props.handleBookClick}/>
        })}
      </Card.Group>
    </div>
  )
}

export default SearchResultsG
