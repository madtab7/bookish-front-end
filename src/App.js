import React, { Component } from 'react';
import './App.css';
import UserPage from './Components/UserPage'
import InitialSearch from './Components/InitialSearch'


class App extends Component {

  render() {
    return (
      <div className="App">
        hello world.
        <InitialSearch />
      </div>
    );
  }
}

export default App;
