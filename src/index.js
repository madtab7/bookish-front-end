import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import signUpUser from './reducers/signUpUser';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';

// import * as reducers from './store/reducers';
// const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

// const store = createStore(signUpUser)
//
// const store = createStore(
//   (state={}) => state,
//   applyMiddleware(thunk)
// );

ReactDOM.render(
  // <Provider store={store}>
    <Router>
      <App />
    </Router>
  // </Provider>
  ,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
