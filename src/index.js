import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Dashboard from './app/dashboard';
import Optimizer from './app/optimizer';
import './assets/css/App.css';

import configureStore, { history } from "./store";
export const store = configureStore();

export const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch> {/* The Switch decides which component to show based on the current URL.*/}
          <Route exact path='/' component={Dashboard}></Route>
          <Route exact path='/optimizer/:id' component={Optimizer}></Route>
        </Switch>
      </Router>
    </Provider>
  );
}

ReactDOM.render(
    <App />	 
  , document.getElementById('root')
);
