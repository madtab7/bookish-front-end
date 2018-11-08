import React, { Component } from 'react';
import SearchContainer from './SearchContainer';
import UserContainer from './UserContainer';
import { Container, Grid, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Bookshelf from '../images/bookshelf.jpg'

export default class Home extends Component{


  render(){
    //need to apply background image with id=home
    return(
      <div style={{
        backgroundImage:`url(${Bookshelf})`,
        marginTop:"0.8%",
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover",
        width: "100%",
        height:"800px"
      }}>

        <Grid columns={1}>
          <Grid.Column style={{textAlign:"center", marginTop:"10%"}}>
            <Button size="massive" name="books">
              <Link to="/books" style={{color:"black"}}>
                <h1 className="subhead">find a book</h1>
              </Link>
            </Button>

            <Button size="massive" name="profile">
              <Link to="/profile" style={{color:"black"}}>
                <h1 className="subhead">see my bookshelf</h1>
              </Link>
            </Button>
          </Grid.Column>
        </Grid>

      </div>
    )
  }
}
