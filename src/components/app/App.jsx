import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from '../../containers/Game';
import TitlePage from '../../containers/TitlePage';
import Register from '../login/Register';
import SignIn from '../login/SignIn';

export default function App() {
  return (
    <Switch>
      <Route
        path="/"
        exact
        render={(routerProps) => <TitlePage {...routerProps} />}
      />
      <Route
        path="/register"
        exact
        render={(routerProps) => <Register {...routerProps} />}
      />
      <Route
        path="/login"
        exact
        render={(routerProps) => <SignIn {...routerProps} />}
      />
      <Route
        path="/game"
        exact
        render={(routerProps) => <Game {...routerProps} />}
      />
    </Switch>
  );
}
