import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from '../../containers/Game';
import TitlePage from '../../containers/TitlePage';
import Register from '../login/Register';
import SignIn from '../login/SignIn';
import Header from './header/Header';

const AUTH = 'AUTH';

const putAuthinLocal = (booger) => {
  localStorage.setItem(AUTH, JSON.stringify(booger));
};

const getAuthFromLocal = () => {
  const auth1 = localStorage.getItem(AUTH);
  if (auth1) return JSON.parse(auth1);
  return {
    email: '',
    id: '',
    token: '',
  };
};


export default function App() {
  const [auth, setAuth] = useState({
    auth: getAuthFromLocal(),
  });

  const handleAuthChange = (authy) => {
    putAuthinLocal(authy);
    const auth1 = getAuthFromLocal();
    setAuth({
      auth: auth1,
    });
  };


  return (
    <>
      <Switch>
        <Route
          path="/"
          exact
          render={(routerProps) => <TitlePage {...routerProps} />}
        />
        <Route
          path="/register"
          exact
          render={(routerProps) => (
            <Register {...routerProps} handleAuth={handleAuthChange} />
          )}
        />
        <Route
          path="/login"
          exact
          render={(routerProps) => (
            <SignIn {...routerProps} handleAuth={handleAuthChange} />
          )}
        />
        <Route
          path="/game"
          exact
          render={(routerProps) => <Game {...routerProps} auth={auth} />}
        />
      </Switch>
      <Header />
    </>
  );
}
