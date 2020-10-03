import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './app/dashboard';
import Optimizer from './app/optimizer';
import './static/css/app.css';
import './static/css/custom.css';


export const App = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Dashboard}></Route>
      <Route exact path='/optimizer/:id' component={Optimizer}></Route>
    </Switch>
  );
}

ReactDOM.render((
  <BrowserRouter>
    <App />	 {/* The various pages will be displayed by the `Main` component. */}
  </BrowserRouter>
  ), document.getElementById('root')
);
