import React from 'react';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

const link = {
  color: 'black'
}

const activeLink = {
  color: 'grey'
}

const NavBar = (props) => {

  return(
    <div id="navBar" style={{position: "relative"}}>

      <div style={{textAlign:"center", marginLeft: "45%"}}>
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

        <NavLink
          to='/community'
          exact style={link}
          activeStyle={activeLink}
        >
          <Icon name="globe" />
        </NavLink>


      </div>
    </div>
  )
}

export default NavBar
