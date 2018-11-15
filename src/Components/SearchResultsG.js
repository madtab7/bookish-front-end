import React from 'react';
import BookCardG from './BookCardG'
import { Card, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const SearchResultsG =(props)=>{

  return(
    <div>

    <Button size="large" name="search" style={{color:"black", marginLeft:"5px", marginTop:"5px"}}>
      <Link to="/" style={{color:"black"}}>
        <h1 className="subhead"><Icon name="chevron left" />back to home</h1>
      </Link>
    </Button>


    <h2 className="subhead" style={{marginLeft:"10px", fontSize:"1.4em"}}>Top results for '{props.userInput}'</h2>
      <Card.Group itemsPerRow={5} style={{marginLeft:"10%", marginRight:"10%", marginTop:"2%", marginBottom:"7%"}}>
        {props.searchData.map((book)=>{
          return <BookCardG key={book.id} book={book} handleBookClick={props.handleBookClick}/>
        })}
      </Card.Group>

      <div style={{textAlign:"center"}}>
        <h3>see more results</h3>
        {props.searchIndex === 0 ? null
        :
          <div id="decrease">
          <Button icon onClick={props.handlePagination}>
            <Icon name="angle double left"/>
          </Button>
          </div>
        }
        <div className="increase">
        <Button icon className="increase" onClick={props.handlePagination}>
          <Icon name="angle double right"/>
        </Button>
        </div>
      </div>
      <br/><br/>

    </div>
  )
}



export default SearchResultsG
