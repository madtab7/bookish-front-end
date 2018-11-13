import React, { Component } from 'react';
import './App.css';
import NavBar from './Components/NavBar'
import Login from './Components/Login'
import Home from './Containers/Home'
import UserContainer from './Containers/UserContainer'
import SearchContainer from './Containers/SearchContainer'
import FriendsContainer from './Containers/FriendsContainer'
import InternalAdapter from './apis/InternalAdapter'
import NotFound from './Components/NotFound'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';


class App extends Component {

  render() {

    return (
      <div className="App">

        {!this.props.loggedIn ?
          <Redirect to ="/login" />
        :
          null
        }

        <NavBar loggedIn={this.props.loggedIn}/>

        <Switch>
          <Route exact path="/"
            render={()=> <Home />}
          />

          <Route path="/login"
            render= {()=> <Login />}
          />

          <Route path="/books"
            render={()=> <SearchContainer
            currentUserData={this.props.user}/>}
          />

          <Route path="/profile"
            render={()=> <UserContainer currentUserData={this.props.user}/>}
          />

          <Route path="/community"
            render={()=> <FriendsContainer currentUserData={this.props.user}/>}
          />

          <Route component={NotFound} />

        </Switch>

      </div>
    );
  }
}

const mapStateToProps = ({ usersReducer: { user, loggedIn } }) => ({
  user,
  loggedIn
})

export default withRouter(connect(mapStateToProps)(App)) //allows for React router props
