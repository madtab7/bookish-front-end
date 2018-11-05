import React, { Component } from 'react';
import { Container, Header, Grid, Button, Icon } from 'semantic-ui-react';

export default class BookShowPage extends Component {

  goBack=()=>{
    window.history.back()
  }


  render(){

    return(
      <Container style={{marginLeft:"70px", marginRight:"70px", marginTop:"30px", marginBottom:"30px"}}>
      <Grid>
        <Grid.Row columns={3}>

          <Grid.Column width={5}>
            <img src={this.props.selectedBookData.volumeInfo.imageLinks.thumbnail} alt="book"/>
          </Grid.Column>

          <Grid.Column width={5}>
            <Header as='h2'> {this.props.selectedBookData.volumeInfo.title} </Header>
            {this.props.selectedBookData.volumeInfo.authors.map((author)=>{
              return <Header as='h3'> {author} </Header>
            })}
            <Header as='h4'>Published: {this.props.selectedBookData.volumeInfo.publishedDate}</Header>
            <Header as='h4'>Page Count: {this.props.selectedBookData.volumeInfo.pageCount}</Header>
            {this.props.selectedBookData.volumeInfo.categories.map((category)=>{
              return <Header as='h5'> {category} </Header>
            })}
          </Grid.Column>

          <Grid.Column width={5}>
            <Button animated onClick={this.props.handleReadClick}>
              <Button.Content visible><h2 className="subhead">mark as read</h2></Button.Content>
              <Button.Content hidden>
                <Icon name="checkmark" />
              </Button.Content>
            </Button>
            <br/><br/>
            <Button animated onClick={this.props.handleWantToReadClick}>
              <Button.Content visible><h2 className="subhead">want to read</h2></Button.Content>
              <Button.Content hidden>
                <Icon name="book" />
              </Button.Content>
            </Button>
            <br/><br/>
            <Button animated onClick={this.props.handlePurchaseClick}>
              <Button.Content visible><h2 className="subhead">purchase</h2></Button.Content>
              <Button.Content hidden>
                <Icon name="amazon" />
              </Button.Content>
            </Button>
          </Grid.Column>

        </Grid.Row>

        <Grid.Row columns={1}>
          <Grid.Column>
            {this.props.selectedBookData.volumeInfo.subtitle ?
              <Header as='h3'>"{this.props.selectedBookData.volumeInfo.subtitle}"</Header>
            :
              null
            }
            <Header as='h4'>Description:</Header>
              <p>
                {this.props.selectedBookData.volumeInfo.description}
              </p>
          </Grid.Column>
        </Grid.Row>

      </Grid>

      <Button onClick={this.goBack}><h2 className="subhead">back to home </h2></Button>
      </Container>
    )
  }

}
