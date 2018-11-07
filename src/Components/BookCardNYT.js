import React from 'react';
import { Card, Image } from 'semantic-ui-react'


const BookCardNYT = ({book, handleBookClick}) => {

  return(
    <Card onClick={handleBookClick} id={book.primary_isbn10} style={{borderRadius:"10px"}}>

      {book.book_image !== undefined ?
        <Image id={book.primary_isbn10} src={book.book_image} style={{height:"200px"}}/>
      :
        <Image src='http://i.imgur.com/sJ3CT4V.gif' style={{height:"200px"}}/>
      }
      <br></br>
      <Card.Header style={{textAlign:"center"}} id={book.primary_isbn10}>{book.title}</Card.Header>
      <Card.Meta style={{textAlign:"center"}}>{book.author}</Card.Meta>
    </Card>

  )

}

export default BookCardNYT
