import React, { Component } from 'react';
import './App.css';
import UserPage from './Components/UserPage'
import InitialSearch from './Components/InitialSearch'


class App extends Component {

  render() {

    console.log(process.env.REACT_APP_GOOGLE_BOOKS_API_KEY)

    return (
      <div className="App">
        hello world.
        <InitialSearch />
      </div>
    );
  }
}

export default App;
