import React from 'react';
import { Card, Image, Button, Popup } from 'semantic-ui-react'
import ReviewModal from './ReviewModal'
import RecommendModal from './RecommendModal'

const BookCardUser = (props) => {

  return(
    <Card id={props.book.book.id} onClick={props.handleBookClick} name="bookcard" style={{width:"15%"}}>
      {props.book.book.imgURL !== undefined ?
        <Image src={props.book.book.imgURL} style={{height:"165px"}} id={props.book.book.id} onClick={props.handleBookClick} name="bookcard"/>
      :
        <Image src='http://i.imgur.com/sJ3CT4V.gif' style={{height:"165px"}} name="bookcard"/>
      }
      <Card.Header style={{textAlign:"center", fontSize:"0.7em"}}>{props.book.book.title}</Card.Header>
      <Card.Meta style={{textAlign:"center", fontSize:"0.7em"}}>{props.book.book.author}</Card.Meta>

      {props.book.want_to_read ?

        <Button.Group basic size="mini">
          <Popup trigger={<Button icon="check" name="read" id={props.book.id} onClick={(event)=>props.handleUpdateBook(event, props.book)}/>} content="mark read" />
          <Popup trigger={<Button icon="delete" name="remove" id={props.book.id} onClick={(event)=>props.handleUpdateBook(event, props.book)}/>} content="remove from list" />
        </Button.Group>

      :
        null
        // <Button circular icon="" />
      }

      {props.book.read ?

        <Button.Group basic size="mini">
          <ReviewModal
            userBook={props.book.book}
            bookId={props.book.book.id}
            handleBookReview={props.handleBookReview}
          />

          <RecommendModal
            userBook={props.book.book}
            bookId={props.book.book.id}
            userFriends={props.userFriends}
            handleRecommendUserBook={props.handleRecommendUserBook}
          />

        </Button.Group>
      :
        null
      }


    </Card>
  )


}
export default BookCardUser
