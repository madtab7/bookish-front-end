import React, { Component } from 'react';
import './App.css';
import UserPage from './Components/UserPage'
import SearchContainer from './Containers/SearchContainer'


class App extends Component {

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

  render() {

    // console.log(process.env.REACT_APP_GOOGLE_BOOKS_API_KEY)


    return (
      <div className="App">
        hello world.
        <SearchContainer />
      </div>
    );
  }
}

export default App;
