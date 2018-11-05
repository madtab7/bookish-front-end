import React, { Component } from 'react';
import SearchContainer from './SearchContainer';
import UserContainer from './UserContainer';
import { Container, Grid, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Bookshelf from '../images/bookshelf.jpg'

export default class Home extends Component{

  handleClick=(event)=>{
    console.log(event.target.innerText)
  }

  render(){
    //need to apply background image with id=home
    return(
      <div style={{
        backgroundImage:`url(${Bookshelf})`,
        marginTop:"1.1%",
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover",
        width: "100%",
        height:"800px"
      }}>

        <Grid columns={2}>
          <Grid.Column style={{textAlign:"center", marginTop:"10%"}}>
            <Button size="massive" name="books" onClick={this.handleClick}>
              <Link to="/books">
                <h1 className="subhead">find a book</h1>
              </Link>
            </Button>
          </Grid.Column>
          <Grid.Column style={{textAlign:"center", marginTop:"10%"}}>
            <Button size="massive" name="profile" onClick={this.handleClick}>
              <Link to="/profile">
                <h1 className="subhead">see my bookshelf</h1>
              </Link>
            </Button>
          </Grid.Column>
        </Grid>

      </div>
    )
  }
}
