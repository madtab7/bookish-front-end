import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import withAuth from '../HOCs/withAuth'
import Bookshelf from '../images/bookshelf.jpg'

class Home extends Component{


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

        <Grid columns={1}>
          <Grid.Column style={{textAlign:"center", marginTop:"10%"}}>
            <Button size="massive" name="books" style={{background:"rgba(255,255,255,0.4)"}}>
              <Link to="/books" style={{color:"black"}}>
                <h1 className="subhead">find a book</h1>
              </Link>
            </Button>

            <Button size="massive" name="profile" style={{background:"rgba(255,255,255,0.4)"}}>
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

export default withAuth(withRouter(Home))
