import React, { Component } from 'react';
import './App.css';
import NavBar from './Components/NavBar'
import Login from './Components/Login'
import Home from './Containers/Home'
import UserContainer from './Containers/UserContainer'
import SearchContainer from './Containers/SearchContainer'
import InternalAdapter from './apis/InternalAdapter'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


class App extends Component {
  state={
    currentUserData:'',
    redirect: false
  }


  registerUser=(event, userData)=>{
    event.preventDefault();
    InternalAdapter.signUpUser(userData)
    .then(r => r.json())
    .then(userData => {
      this.setState({
        currentUserData: userData.user,
        redirect: true
      })
    })
    /// add error messages if invalid
  }

  loginUser=(event, userData)=>{
    event.preventDefault();
    InternalAdapter.loginUser(userData)
    .then(r => r.json())
    .then(userData => {
      this.setState({
        currentUserData: userData.user,
        redirect:true
      },()=> console.log(this.state))
    })
    /// add error messages if invalid
  }

  render() {

    return (
      <div className="App">

        {this.state.currentUserData.username === undefined ?
          <Redirect to ="/login" />
        :
          null
        }

        {this.state.redirect ?
          <Redirect to="/" />
        :
          null
        }

        <NavBar />

        <Switch>
          <Route exact path="/"
            render={()=> <Home />}
          />

          <Route path="/login"
            render=
            {()=> <Login registerUser={this.registerUser} loginUser={this.loginUser}/>}
          />

          <Route path="/books"
            render={()=> <SearchContainer currentUserData={this.state.currentUserData}/>}
          />

          <Route path="/profile"
            render={()=> <UserContainer currentUserData={this.state.currentUserData}/>}
          />

        </Switch>

      </div>
    );
  }
}

export default App;
