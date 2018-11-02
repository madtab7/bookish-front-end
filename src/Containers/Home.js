import React, { Component } from 'react';
import SearchContainer from './SearchContainer';
import UserContainer from './UserContainer';
import { Container, Grid, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Home extends Component{

  handleClick=(event)=>{
    console.log(event.target.innerText)
  }

  render(){
    //need to apply background image with id=home
    return(
      <div id="home">

        <Grid columns={2} style={{marginTop:"10%"}}>
          <Grid.Column style={{textAlign:"center"}}>
            <Button size="massive" name="books" onClick={this.handleClick}>
              <Link to="/books">
                <h1 id="subhead">find a book</h1>
              </Link>
            </Button>
          </Grid.Column>
          <Grid.Column style={{textAlign:"center"}}>
            <Button size="massive" name="profile" onClick={this.handleClick}>
              <Link to="/profile">
                <h1 id="subhead">see my bookshelf</h1>
              </Link>
            </Button>
          </Grid.Column>
        </Grid>

      </div>
    )
  }
}

// <h1 id="subhead" name="profile">see my bookshelf</h1>
