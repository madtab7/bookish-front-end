import React, { Component } from 'react';
import { Grid, Form, Button, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import InternalAdapter from '../apis/InternalAdapter'

const LoginForm = (props) => {

  return(
    <Form>
      <Form.Input
        fluid label="Username"
        name="username"
        placeholder="Username"
        value={props.username}
        onChange={props.handleLoginInputChange}
      />
      <Form.Input
        type="password"
        fluid label="Password"
        name="password"
        placeholder="Password"
        value={props.password}
        onChange={props.handleLoginInputChange}
      />
      <Button type="submit" basic color='black' onClick={props.handleUserLogin}>Login</Button>
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
        onChange={props.handleNewUserInputChange}
      />
      <Form.Input
        fluid label="Username"
        name="username"
        placeholder="Username"
        value={props.username}
        onChange={props.handleNewUserInputChange}
      />
      <Form.Input
        fluid label="Profile Photo"
        name="avatarURL"
        placeholder="URL"
        value={props.avatarURL}
        onChange={props.handleNewUserInputChange}
      />
      <Form.Input
        type="password"
        fluid label="Password"
        name="password"
        placeholder="Password"
        value={props.password}
        onChange={props.handleNewUserInputChange}
      />
      <Button type="submit" basic color='black' onClick={props.handleNewUserSubmit}>Join</Button>
    </Form>
  )

}

/////////////////////////////////////////////////////////////////

class Login extends Component{

  state={
    newUser: {
      username:"",
      password:"",
      full_name:"",
      avatarURL:""
    },
    user: {
      username:"",
      password:""
    },
    typeUser:""
  }

  handleNewUserInputChange=(event)=>{
    const signUpUser = Object.assign({}, this.state.newUser)
    signUpUser[event.target.name] = event.target.value
    this.setState({
      newUser: signUpUser
    })
  }

  handleLoginInputChange=(event)=>{
    const user = Object.assign({}, this.state.user)
    user[event.target.name] = event.target.value
    this.setState({
      user: user
    })
  }

  handleNewUserSubmit=(event)=>{
    event.preventDefault()
    this.props.registerUser(event, this.state.newUser)
  }

  handleUserLogin=(event)=>{
    event.preventDefault()
    this.props.loginUser(event, this.state.user)
  }

  handleButtonClick=(event)=>{
    this.setState({
      typeUser: event.target.id
    })
  }

  render(){

    return(
      <Grid column={1} style={{marginLeft:"30%", marginRight:"30%", marginTop:"5%"}}>
        <Grid.Column width={10} style={{position:"relative"}}>

        <Button animated onClick={this.handleButtonClick}>
          <Button.Content visible>New User</Button.Content>
          <Button.Content id="new" hidden>Get Started</Button.Content>
        </Button>

        <Button animated onClick={this.handleButtonClick}>
          <Button.Content visible>Existing User</Button.Content>
          <Button.Content id="existing" hidden>SignIn</Button.Content>
        </Button>

        {this.state.typeUser === "new" ?
        <SignUpForm
          handleNewUserInputChange={this.handleNewUserInputChange}
          username={this.state.newUser.username}
          password={this.state.newUser.password}
          full_name={this.state.newUser.full_name}
          avatarURL={this.state.newUser.avatarURL}
          registerUser={this.props.registerUser}
          handleNewUserSubmit={this.handleNewUserSubmit}
        />
        :
        null
        }

        {this.state.typeUser === "existing" ?
        <LoginForm
          handleLoginInputChange={this.handleLoginInputChange}
          username={this.state.user.username}
          password={this.state.user.password}
          handleUserLogin={this.handleUserLogin}
        />

        :
        null
        }

        </Grid.Column>
      </Grid>
    )
  }

}

export default Login
// connect((state) => {return{}}, { signUpUser })(Login);
