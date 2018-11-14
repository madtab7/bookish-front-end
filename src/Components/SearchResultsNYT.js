import React from 'react';
import BookCardNYT from './BookCardNYT'
import { Card, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function nameCategory(string){
  return string.split("-").join(" ")
}


const SearchResultsNYT=(props)=>{

  return(
    <div>

    <Button size="large" name="search" style={{color:"black", marginLeft:"5px", marginTop:"5px"}}>
      <Link to="/" style={{color:"black"}}>
        <h1 className="subhead"><Icon name="chevron left" />back to home</h1>
      </Link>
    </Button>

      <h2 className="subhead" style={{marginLeft:"10px", fontSize:"1.4em"}}>Best-sellers for "{nameCategory(props.listSelect)}"</h2>

      <Card.Group itemsPerRow={5} style={{marginLeft:"10%", marginRight:"10%", marginTop:"2%", marginBottom:"7%"}}>
        {props.NYTData.map((book)=>{
          return <BookCardNYT key={book.primary_isbn10} book={book} handleBookClick={props.handleBookClick}/>
        })}
      </Card.Group>
    </div>
  )

}

export default SearchResultsNYT
