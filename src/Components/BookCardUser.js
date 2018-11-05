import React from 'react';
import { Card, Image, Button, Popup } from 'semantic-ui-react'

//need to map authors so card can handle multiple authors
const BookCardUser = (props) => {

  return(
    <Card >
    <Card.Header style={{textAlign:"center"}}>{props.book.book.title}</Card.Header>
    <Card.Meta style={{textAlign:"center"}}>{props.book.book.author}</Card.Meta>

    {props.book.book.imgURL !== undefined ?
      <Image src={props.book.book.imgURL}/>
    :
      <Image src='http://i.imgur.com/sJ3CT4V.gif'/>
    }

    {props.book.want_to_read ?

      <Button.Group basic size="mini">
        <Popup trigger={<Button icon="check" name="read" id={props.book.id} onClick={props.handleUpdateBook}/>} content="mark read" />
        <Popup trigger={<Button icon="delete" name="remove" id={props.book.id} onClick={props.handleUpdateBook}/>} content="remove from list" />
      </Button.Group>

    :
      null
      // <Button circular icon="" />
    }

    </Card>
  )


}
export default BookCardUser
