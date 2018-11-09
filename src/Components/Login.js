import React, { Component } from 'react';
import { Grid, Form, Button, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router'
import { loginUser } from '../actions/user'
import InternalAdapter from '../apis/InternalAdapter'
import BackgroundURL from '../images/book1.jpg'

class Login extends Component{

  state={
    username: "",
    password: ""
  }


  handleLoginInputChange=(event, { name, value })=>{
    this.setState({
      [name]: value
    })
  }

  handleUserLogin=(event)=>{
    this.props.loginUser(this.state.username, this.state.password)
    this.setState({ /// reset state
      username:"",
      password:""
    })
  }

  render(){

    return this.props.loggedIn ? (
      <Redirect to="/" />
    ) : (
      <Form style={{
        background:"rgba(255,255,255,0.4)",
        width:"40%",
        padding:"5%",
        borderRadius:"25px"}}
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
          onChange={this.handleLoginInputChange}
        />
        <Form.Input
          type="password"
          fluid label="Password"
          name="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleLoginInputChange}
        />
        <Button type="submit" style={{color:"black"}} >
          <h2 className="subhead">Login</h2>
        </Button>
      </Form>
    )

  }

}

const mapStateToProps = ({ usersReducer: { authenticatingUser, failedLogin, error, loggedIn } }) => ({
  authenticatingUser,
  failedLogin,
  error,
  loggedIn
})

export default withRouter(connect(mapStateToProps, { loginUser })(Login))
