import React from 'react';
import { Card, Image } from 'semantic-ui-react'


const BookCardNYT = ({book, handleBookClick}) => {

  return(
    <Card onClick={handleBookClick} id={book.primary_isbn10}>
    <Card.Header style={{textAlign:"center"}} id={book.primary_isbn10}>{book.title}</Card.Header>
    <Card.Meta>{book.author}</Card.Meta>
    <br></br>
    {book.book_image !== undefined ?
      <Image id={book.primary_isbn10} src={book.book_image}/>
    :
      <Image src='http://i.imgur.com/sJ3CT4V.gif'/>
    }
    </Card>

  )

}

export default BookCardNYT
