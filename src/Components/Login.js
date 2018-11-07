import React, { Component } from 'react';
import { Grid, Form, Button, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import InternalAdapter from '../apis/InternalAdapter'
import BackgroundURL from '../images/book1.jpg'

const LoginForm = (props) => {

  return(
    <Form style={{
      background:"rgba(255,255,255,0.4)",
      width:"40%",
      padding:"5%",
      borderRadius:"25px"}}>
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
      <Button style={{color:"black"}} type="submit" onClick={props.handleUserLogin}><h2 className="subhead">Login</h2></Button>
    </Form>
  )

}

const SignUpForm = (props) => {

  return(
    <Form style={{
      background:"rgba(255,255,255,0.4)",
      width:"40%",
      padding:"5%",
      borderRadius:"25px"}}>
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
      <Button style={{color:"black"}} type="submit" onClick={props.handleNewUserSubmit}><h2 className="subhead">Join</h2></Button>
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
      <div style={{
        backgroundImage:`url(${BackgroundURL})`,
        marginTop:"0%",
        backgroundRepeat:"no-repeat",
        // backgroundPosition:"center",
        backgroundSize:"cover",
        width: "100%",
        height:"800px"
      }}>
      <Grid center columns={1} rows={2} style={{marginTop:"0%", marginLeft:"30%"}}>
        <Grid.Row width={10} style={{position:"relative", marginTop:"20%"}}>

        <Button style={{color:"black"}} size="massive" animated id="new" onClick={this.handleButtonClick}>
          <Button.Content visible><h2 className="subhead" id="new">New User</h2></Button.Content>
          <Button.Content hidden><h2 className="subhead" id="new">Get Started</h2></Button.Content>
        </Button>

        <Button style={{color:"black"}} size="massive" animated id="existing" onClick={this.handleButtonClick}>
          <Button.Content visible><h2 className="subhead" id="existing">Existing User</h2></Button.Content>
          <Button.Content hidden><h2 className="subhead" id="existing">Sign In</h2></Button.Content>
        </Button>
        </Grid.Row>

        <Grid.Row width={10} style={{position:"relative"}}>
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

        </Grid.Row>
      </Grid>
      </div>
    )
  }

}

export default Login
// connect((state) => {return{}}, { signUpUser })(Login);
