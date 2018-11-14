import React, { Fragment } from 'react';
import { NavLink, withRouter, Redirect } from 'react-router-dom'
import { Icon, Image, Popup } from 'semantic-ui-react'

const link = {
  color: 'black'
}

const activeLink = {
  color: 'grey'
}

const handleLogout=()=>{
  localStorage.removeItem('jwt')
  window.location.reload()
}


const NavBar = (props) => {

  return(
    <div id="navBar" style={{position: "relative"}}>

      <div style={{textAlign:"center", marginLeft: "45%", marginBottom:"1%"}}>
      <NavLink
        to='/'
        exact style={link}
        activeStyle={activeLink}
      >
        <h1 id="bookish" >
        bookish
        </h1>
      </NavLink>
      </div>

      <div style={{textAlign:"right", marginRight:"5%"}}>

        {props.loggedIn ?
        <Fragment>

          <Popup trigger={

            <NavLink
            to='/books'
            exact style={link}
            activeStyle={activeLink}
            >
            <Icon name="search" size="large"/>
            </NavLink>
          }
            basic
            size="small"
            content="search books"/>

          <Popup trigger={

            <NavLink
            to='/profile'
            exact style={link}
            activeStyle={activeLink}
            >
            <Image src={props.user.avatarURL} avatar style={{width:"1.75%", height:"1.75%"}}/>
            </NavLink>

          }
            basic
            size="small"
            content="profile"/>

          <Popup trigger={

            <NavLink
            to="/login"
            exact style={link}
            activeStyle={activeLink}
            onClick={handleLogout}
            >
            <Icon name="sign-out" style={link} size="large"/>
            </NavLink>

          }
            basic
            size="small"
            content="sign out"/>


        </Fragment>
        :
          <Redirect to ="/login" />
        }


      </div>
    </div>
  )
}

export default withRouter(NavBar)
