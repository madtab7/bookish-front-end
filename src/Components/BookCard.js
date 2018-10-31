import React from 'react';
import { Card, Image } from 'semantic-ui-react'

const BookCard = ({book}) => {
  console.log(book.volumeInfo.imageLinks)

  return(
    <Card>
    <Card.Header style={{textAlign:"center"}}>{book.volumeInfo.title}</Card.Header>
      {book.volumeInfo.authors.map((authorName)=>{
        return <Card.Meta key={authorName} style={{textAlign:"center"}}>{authorName}</Card.Meta>
      })}
    <br></br>
    {book.volumeInfo.imageLinks !== undefined ?
      <Image src={book.volumeInfo.imageLinks.thumbnail}/>
    :
      <Image src='http://i.imgur.com/sJ3CT4V.gif'/>
    }
    </Card>
  )


}

export default BookCard

// STATIC IMAGE IN ASSETS FOLDER NOT WORKING <Image src='../Assets/no_cover.png'/>
