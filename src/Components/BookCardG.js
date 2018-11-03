import React from 'react';
import { Card, Image } from 'semantic-ui-react'

//need to map authors so card can handle multiple authors
const BookCardG = ({book, handleBookClick}) => {

  console.log(book)
  // console.log(book.volumeInfo.industryIdentifiers[0].identifier)
  let isbn=book.volumeInfo.industryIdentifiers[0].identifier

  return(
    <Card onClick={handleBookClick} id={isbn}>
    <Card.Header id={isbn} style={{textAlign:"center"}}>{book.volumeInfo.title}</Card.Header>
    <br></br>
    {book.volumeInfo.authors ?
      <Card.Meta id={isbn} style={{textAlign:"center"}}>{book.volumeInfo.authors[0]}</Card.Meta>
    :
      null
    }
    {book.volumeInfo.imageLinks !== undefined ?
      <Image id={isbn} src={book.volumeInfo.imageLinks.thumbnail}/>
    :
      <Image id={isbn} src='http://i.imgur.com/sJ3CT4V.gif'/>
    }
    </Card>
  )


}
export default BookCardG

// STATIC IMAGE IN ASSETS FOLDER NOT WORKING <Image src='../Assets/no_cover.png'/>
