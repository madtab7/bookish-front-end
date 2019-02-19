import React, { Fragment } from 'react';
import { Grid, Icon, Modal, Segment, Divider, Rating } from 'semantic-ui-react';



const BookModalUserPage = (props)=> {

  return(
    <Modal
    open={props.open}
    >
      <Icon name="close" onClick={props.handleClose} />
      <Modal.Content>

        <Grid columns={2}>
          <Grid.Column width={6}>
            <img src={props.selectedBookData.imgURL} alt="book" style={{position:"relative", marginLeft:"25%"}}/>
            <h2 className="subhead">{props.selectedBookData.title}</h2>
            <h3 className="subhead">{props.selectedBookData.author}</h3>
          </Grid.Column>

          <Grid.Column width={10}>
            <Grid.Row>
              <p style={{fontSize:"1em"}}>{props.selectedBookData.description}</p>
            </Grid.Row>

          <Divider fitted />
          <Grid.Row>

          {props.selectedBookData.reviews && props.selectedBookData.reviews.length > 0 ?
            <Fragment>
            <h1 className="subhead"> Reviews: </h1>

            {props.selectedBookData.reviews.map((review)=>{
              return(
                <Segment>
                <Rating icon='star' defaultRating={review.rating} maxRating={5} disabled />
                <h4>{review.title}</h4>
                <p>{review.content}</p>
                </Segment>
              )
            })}
            </Fragment>
            :
            null
          }

          </Grid.Row>

        </Grid.Column>


        </Grid>

      </Modal.Content>
    </Modal>

  )
}

export default BookModalUserPage
