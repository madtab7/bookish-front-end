import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react'


const BookCardNYT = ({book, handleBookClick}) => {

  // console.log(book)

  return(
    <Card onClick={handleBookClick} id={book.primary_isbn13} style={{borderRadius:"10px", width:"15%"}}>

      {book.book_image !== undefined ?
        <Image id={book.primary_isbn13} src={book.book_image} style={{height:"250px"}}/>
      :
        <Image src='http://i.imgur.com/sJ3CT4V.gif' style={{height:"250px"}}/>
      }
      <Card.Header style={{textAlign:"bottomLeft", color:"black"}}>
      <Icon name="hashtag" size="small"/>
      {book.rank}
      </Card.Header>
      <Card.Header style={{textAlign:"center"}} id={book.primary_isbn13}>{book.title}</Card.Header>
      <Card.Meta style={{textAlign:"center"}}>{book.author}</Card.Meta>

    </Card>

  )

}

export default BookCardNYT
