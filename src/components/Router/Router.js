// Реализуйте роутер

// Роутер должен иметь роуты для компонентов Login и Search
// Вам потребуется использовать PrivateRoute для Search
// По умолчанию нужно перенаправлять на страницу логина
import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from '../Login';
import PrivateRoute from '../PrivateRoute';
import Search from '../Search';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route to="/" exact component={Login} />
          <PrivateRoute to="/search" component={Search} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default Router;
