import React, { Fragment } from 'react'
import { Header, Image } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const NotFound = () => (
  <Fragment>
    <Header size="huge">
      There seems to be an error.
      <NavLink
        to="/"
        style={{
          color:"black"
        }}
      >
      </NavLink>
    </Header>
  </Fragment>
)

export default NotFound
