import React from 'react'
import { Header, Message, Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import Error from '../images/error.jpg'

const NotFound = (props) => (
  <div style={{
    backgroundImage:`url(${Error})`,
    marginTop:"0%",
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
    zIndez: "-1",
    width: "100%",
    height:"800px",
    textAlign:"center"}}
  >
      <Message negative
        visible
      >
        {props.message}
      </Message>
      <Header size="huge" className="subhead" style={{fontSize:"4em"}}>
        not found.
      </Header>
      <NavLink
        to="/"
        style={{
          color:"black",
          textAlign:"center"
        }}
      >
        <Button size="massive" style={{background:"rgba(255,255,255,0.4)", fontSize:"2em", position:"relative"}}>
          <h1 className="subhead">back to home</h1>
        </Button>
      </NavLink>
  </div>
)

export default NotFound
