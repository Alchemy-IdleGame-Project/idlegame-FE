import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from '../../containers/Game';
import TitlePage from '../../containers/TitlePage';

export default function App() {
  return (
    <Switch>
      <Route
        path="/"
        exact
        render={(routerProps) => <TitlePage {...routerProps} />}
      />
      <Route
        path="/game"
        exact
        render={(routerProps) => <Game {...routerProps} />}
      />
    </Switch>
  );
}
