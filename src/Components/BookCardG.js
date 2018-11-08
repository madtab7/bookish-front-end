import React from 'react';
import { Card, Image } from 'semantic-ui-react'

//need to map authors so card can handle multiple authors
const BookCardG = ({book, handleBookClick}) => {
  // console.log(book)

  // error protection for non standard isbn numbers
  function getISBN(book){
    let isbn;
    if(book.volumeInfo.industryIdentifiers){
      isbn = book.volumeInfo.industryIdentifiers.find((isbn)=>{
        return isbn.type === "ISBN_13"
      })
      if(!isbn){
        isbn = "error"
      } else {
        isbn = isbn.identifier
      }
    } else {
      isbn = "error"
    }
    return isbn
  }

  let isbn = getISBN(book)

  // console.log(isbn)

  // currently assigns "error" for non13 digit isbns


  return(
    <Card onClick={handleBookClick} id={isbn}>
      {book.volumeInfo.imageLinks !== undefined ?
        <Image id={isbn} src={book.volumeInfo.imageLinks.thumbnail} style={{height:"250px"}}/>
      :
        <Image id={isbn} src='http://i.imgur.com/sJ3CT4V.gif' style={{height:"250px"}}/>
      }
      <br></br>
      <Card.Header id={isbn} style={{textAlign:"center"}}>{book.volumeInfo.title}</Card.Header>
      {book.volumeInfo.authors ?
        <Card.Meta id={isbn} style={{textAlign:"center"}}>{book.volumeInfo.authors[0]}</Card.Meta>
      :
        null
      }
    </Card>
  )


}
export default BookCardG

// STATIC IMAGE IN ASSETS FOLDER NOT WORKING <Image src='../Assets/no_cover.png'/>
