import React, { Component } from 'react';
import { Grid, Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import InternalAdapter from '../apis/InternalAdapter'

const LoginForm = (props) => {

  return(
    <Form>
      <Form.Input
        fluid label="Username"
        name="username"
        placeholder="Username"
        onChange={props.handleInputChange}
      />
      <Form.Input
        type="password"
        fluid label="Password"
        name="password"
        placeholder="Password"
        onChange={props.handleInputChange}
      />
      <Button type="submit" basic color='black'>Login</Button>
    </Form>
  )

}

const SignUpForm = (props) => {

  return(
    <Form>
      <Form.Input
        fluid label="Full name"
        name="full_name"
        placeholder="Full name"
        value={props.full_name}
        onChange={props.handleInputChange}
      />
      <Form.Input
        fluid label="Username"
        name="username"
        placeholder="Username"
        value={props.username}
        onChange={props.handleInputChange}
      />
      <Form.Input
        fluid label="Profile Photo"
        name="avatarURL"
        placeholder="URL"
        value={props.avatarURL}
        onChange={props.handleInputChange}
      />
      <Form.Input
        type="password"
        fluid label="Password"
        name="password"
        placeholder="Password"
        value={props.password}
        onChange={props.handleInputChange}
      />
      <Button type="submit" basic color='black' onClick={props.handleNewUserSubmit}>Join!</Button>
    </Form>
  )

}

/////////////////////////

class Login extends Component{

  state={
    newUser: {
      username:"",
      password:"",
      full_name:"",
      avatarURL:""
    }
  }

  handleInputChange=(event)=>{
    const signUpUser = Object.assign({}, this.state.newUser)
    signUpUser[event.target.name] = event.target.value
    this.setState({
      newUser: signUpUser
    })
  }

  // registerUser=(event)=>{
  //   event.preventDefault();
  //   // console.log(JSON.stringify(this.state.newUser))
  //   InternalAdapter.signUpUser(this.state.newUser)
  //
  // }

  handleNewUserSubmit=(event)=>{
    event.preventDefault()
    this.props.registerUser(event, this.state.newUser)
  }

  render(){

    return(
      <Grid column={1} style={{marginLeft:"30%", marginRight:"30%", marginTop:"5%"}}>
        <Grid.Column width={10} style={{position:"relative"}}>
          <SignUpForm
            handleInputChange={this.handleInputChange}
            username={this.state.newUser.username}
            password={this.state.newUser.password}
            full_name={this.state.newUser.full_name}
            avatarURL={this.state.newUser.avatarURL}
            registerUser={this.props.registerUser}
            handleNewUserSubmit={this.handleNewUserSubmit}
          />
        </Grid.Column>
      </Grid>
    )
  }

}

export default Login
// connect((state) => {return{}}, { signUpUser })(Login);
