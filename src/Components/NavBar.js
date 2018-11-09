import React from 'react';
import { BrowserRouter as Router, NavLink, Route, withRouter, Redirect } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import { logoutUser } from '../actions/user'
import { connect } from 'react-redux';

const link = {
  color: 'black'
}

const activeLink = {
  color: 'grey'
}


const NavBar = (props) => {

  // function handleLogout(){
  //   localStorage.removeItem('jwt')
  // }

  return(
    <div id="navBar" style={{position: "relative"}}>

      <div style={{textAlign:"center", marginLeft: "45%", marginBottom:"1%"}}>
        <h1 id="bookish">
        bookish
        </h1>
      </div>

      <div style={{textAlign:"right", marginRight:"5%"}}>
        <NavLink
          to='/'
          exact style={link}
          activeStyle={activeLink}
        >
          <Icon name="home" />
        </NavLink>

        <NavLink
          to='/books'
          exact style={link}
          activeStyle={activeLink}
        >
          <Icon name="search" />
        </NavLink>

        <NavLink
          to='/profile'
          exact style={link}
          activeStyle={activeLink}
        >
          <Icon name="user" />
        </NavLink>

        {props.loggedIn ?
          <NavLink
            to="/login"
            exact style={link}
            activeStyle={activeLink}
          >
            <Icon name="sign-out" style={link} />
          </NavLink>

        :
          <Redirect to ="/login" />
        }


      </div>
    </div>
  )
}

export default withRouter(NavBar)
