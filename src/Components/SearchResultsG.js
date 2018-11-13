import React from 'react';
import BookCardG from './BookCardG'
import { Card, Button, Icon } from 'semantic-ui-react'

const SearchResultsG =(props)=>{

  return(
    <div>
    <h2 className="subead">Top results for '{props.userInput}'</h2>
      <Card.Group itemsPerRow={5} style={{marginLeft:"50px", marginRight:"50px", marginTop:"30px", marginBottom:"30px"}}>
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
