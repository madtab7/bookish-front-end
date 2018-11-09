import React, { Component } from 'react';
import { Grid, Form, Button, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router'
import { loginUser, signUpUser } from '../actions/user'
import InternalAdapter from '../apis/InternalAdapter'
import BackgroundURL from '../images/book1.jpg'

class Login extends Component{

  state={
    username: "",
    password: "",
    full_name: "",
    avatarURL: "",
    clickedNewUser: false
  }


  handleInputChange=(event, { name, value })=>{
    this.setState({
      [name]: value
    },()=>console.log(this.state))
  }

  handleUserLogin=(event)=>{
    this.props.loginUser(this.state.username, this.state.password)
    this.setState({ /// reset state
      username:"",
      password:""
    })
  }

  handleNewUserRegistration=(event)=>{
    this.props.signUpUser(this.state.username, this.state.password, this.state.full_name, this.state.avatarURL)
    this.setState({ /// reset state
      username:"",
      password:"",
      full_name:"",
      avatarURL:""
    })
  }

  handleNewUserClick=()=>{
    this.setState({
      clickedNewUser:true
    })
  }

  render(){

    return(

      <div style={{
        backgroundImage:`url(${BackgroundURL})`,
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover",
        width: "100%",
        height:"800px"
      }}>
      {!this.state.clickedNewUser ?
        <div>
        <Form style={{
          background:"rgba(255,255,255,0.4)",
          width:"40%",
          padding:"5%",
          borderRadius:"25px",
          textAlign: "center"
        }}
          loading={this.props.loading}
          error={this.props.failedLogin}
          onSubmit={this.handleUserLogin}
        >

          <Message error header={this.props.failedLogin ? this.props.error : null} />

          <Form.Input
            fluid label="Username"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
          <Form.Input
            type="password"
            fluid label="Password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <Button type="submit" style={{color:"black"}} >
            <h2 className="subhead">Login</h2>
          </Button>
          <h2 className="subhead">OR</h2>
          <Button style={{color:"black"}} onClick={this.handleNewUserClick}>
            <h2 className="subhead">Create an Account</h2>
          </Button>
        </Form>

        </div>

      :
        <Form style={{
          background:"rgba(255,255,255,0.4)",
          width:"40%",
          padding:"5%",
          borderRadius:"25px",
          textAlign: "center"
        }}
          loading={this.props.loading}
          error={this.props.failedLogin}
          onSubmit={this.handleNewUserRegistration}
        >
          <Message error header={this.props.failedLogin ? this.props.error : null} />

          <Form.Input
            fluid label="Full name"
            name="full_name"
            placeholder="Full name"
            value={this.state.full_name}
            onChange={this.handleInputChange}
          />
          <Form.Input
            fluid label="Username"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
          <Form.Input
            fluid label="Profile Photo URL"
            name="avatarURL"
            placeholder="URL"
            value={this.state.avatarURL}
            onChange={this.handleInputChange}
          />
          <Form.Input
            type="password"
            fluid label="Password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <Button style={{color:"black"}} type="submit" onClick={this.props.handleNewUserSubmit}><h2 className="subhead">Join</h2></Button>
        </Form>

      }

      {this.props.loggedIn ?
        <Redirect to="/" />
      :
        null
      }


      </div>

    )

  }

}

const mapStateToProps = ({ usersReducer: { authenticatingUser, failedLogin, error, loggedIn } }) => ({
  authenticatingUser,
  failedLogin,
  error,
  loggedIn
})

export default withRouter(connect(mapStateToProps, { loginUser, signUpUser })(Login))
