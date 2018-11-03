import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'

export default class UserPage extends Component{

  render(){
    return(
      <Grid columns={2} style={{marginLeft:"10%", marginRight:"10%", marginTop:"2%"}}>
        <Grid.Column width={5}>
          <img src={this.props.currentUserData.avatarURL} id="avatarImg"/>
          <h2 id="subhead" style={{textAlign:"left"}}>{this.props.currentUserData.username}</h2>
        </Grid.Column>

        <Grid.Column width={10}>
          <Grid.Row>
            row 1
          </Grid.Row>

          <Grid.Row>
            row 2
          </Grid.Row>
        </Grid.Column>

      </Grid>
    )
  }
}
