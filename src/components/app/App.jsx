import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Game from '../../containers/Game';
import TitlePage from '../../containers/TitlePage';

export default function App() {
  return (
    <Router>
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
    </Router>
  );
}
