import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'

export default class UserPage extends Component{

  render(){
    return(
      <Grid columns={2}>
        <Grid.Column width={5}>
          hello
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
