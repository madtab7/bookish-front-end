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
    currentUser:''
  }

  // TEST LOGIN
  // componentDidMount=()=>{
  //   fetch('http://localhost:3001/api/v1/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       user: {
  //         username: "maddyTEST5",
  //         password: "madtab",
  //         full_name: "Maddy Tabing",
  //         avatarURL: "www.something.com"
  //       }
  //     })
  //   })
  // }

  registerUser=(event, userData)=>{
    event.preventDefault();
    // console.log(JSON.stringify(this.state.newUser))
    InternalAdapter.signUpUser(userData)

  }

  render() {


    return (
      <div className="App">
        <NavBar />

        <Switch>
          <Route exact path="/"
            render={()=> <Home />}
          />

          <Route path="/login"
            render=
            {()=> <Login registerUser={this.registerUser}/>}
          />

          <Route path="/books"
            render={()=> <SearchContainer/>}
          />

          <Route path="/profile"
            render={()=> <UserContainer/>}
          />

        </Switch>

      </div>
    );
  }
}

export default App;
