import React from 'react';
import { Card, Image } from 'semantic-ui-react'

//need to map authors so card can handle multiple authors
const BookCardG = ({book, handleBookClick}) => {

  console.log(book)

  let isbn;

  let isbn13 = book.volumeInfo.industryIdentifiers.find((isbn)=>{return isbn.type==="ISBN_13"})

  if(isbn13){
    isbn = isbn13.identifier
  } else {
    isbn = 1
  }   
  // add error protection for non-13 digit isbn numbers

  console.log(isbn)
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
