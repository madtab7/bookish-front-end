import React from 'react';
import BookCardNYT from './BookCardNYT'
import { Card } from 'semantic-ui-react'

function nameCategory(string){
  return string.split("-").join(" ")
}

const SearchResultsNYT=(props)=>{

  return(
    <div>
      <h2>Best-sellers for "{nameCategory(props.listSelect)}"</h2>
      <Card.Group itemsPerRow={5} style={{marginLeft:"50px", marginRight:"50px", marginTop:"30px", marginBottom:"30px"}}>
        {props.NYTData.map((book)=>{
          return <BookCardNYT key={book.primary_isbn10} book={book} handleBookClick={props.handleBookClick}/>
        })}
      </Card.Group>
    </div>
  )

}

export default SearchResultsNYT
